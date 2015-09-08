 var gulp = require('gulp'),
     gutil = require('gulp-util'),
     gulpif = require('gulp-if'),
     uglify = require('gulp-uglify'),
     connect = require('gulp-connect'),
     minifyCSS = require('gulp-minify-css'),
     minifyHTML = require('gulp-minify-html'),
     concat = require('gulp-concat'),
     jshint = require('gulp-jshint'),
     ftp = require('vinyl-ftp');
     
 var jsSources,
     cssSources,

     jsSources = [
         'bower_components/jquery/dist/jquery.js',
         'bower_components/jquery-ui/jquery-ui.js',
         'bower_components/bootstrap/dist/js/bootstrap.js',
         'bower_components/jquery-ui-touch-punch/jquery.ui.touch-punch.js',
     ],

     cssSources = [
         'components/*.css'
     ];

 //  måske skal vi ind og styre rækkefølgen af css filer --> concat


 gulp.task('log', function() {
     gutil.log("Hej fra loggen");
 });

 gulp.task('js', function() {
     // Concat evt egne scripts til shared_functions.js 
     gulp.src(jsSources)
         //.on('error', swallowError)
         .pipe(concat("vendor_scripts.js"))
         //.pipe(uglify())
         //.pipe(gulpif(env === 'production', uglify()))
         .pipe(gulp.dest('objekter/development/library'))

     gulp.src('components/shared_functions.js')
         .pipe(concat("custom_scripts.js"))
         //.pipe(uglify())
         //.pipe(gulpif(env === 'production', uglify()))
         .pipe(gulp.dest('objekter/development/library'))
         .pipe(connect.reload())
 });

 gulp.task('css', function() {
     gulp.src(cssSources)
         .pipe(concat("styles.css"))
         // .pipe(gulpif(env === 'production', minifyCSS({
         //     keepBreaks: false
         // })))
         .pipe(minifyCSS({
             compatibility: 'ie8'
         }))
         .pipe(gulp.dest('objekter/development/library/css'))
         .pipe(connect.reload())

 });

 gulp.task('reload', function() {
     gulp.src('objekter/development/**/*.js')
         //.on('error', swallowError)
         //.pipe(concat("vendor_scripts.js"))
         //.pipe(uglify())
         //.pipe(gulpif(env === 'production', uglify()))
         //.pipe(gulp.dest('objekter/library'))
         .pipe(connect.reload())
 });



//ALT DER VEDRØRER PRODUCTION, TRIMMING OG DEPLOYMENT:
 gulp.task('copy_production', function() {
     
     //gutil.log("Its time to production mode it!");
     //objekter/kemi_drag/builds/development/
     gulp.src(['objekter/development/**/*'])

     .pipe(gulp.dest('objekter/production'))
         //.pipe(wait(1500))
         //gulp.task('trim_files');

     gulp.src(['objekter/library/**/*'])

     .pipe(gulp.dest('objekter/production/library'))
         //.pipe(wait(1500))
         //gulp.task('trim_files');


 });

 gulp.task('trim_files', function() {
     gulp.src("objekter/production/**/*.css")
         //.pipe(wait(1500))
         .pipe(minifyCSS({
             keepBreaks: false
         }))
         .pipe(gulp.dest('objekter/production/'))

     gulp.src("objekter/production/**/*.html")
         .pipe(minifyHTML({
             quotes: true
         }))
         .pipe(gulp.dest('objekter/production/'))

     gulp.src("objekter/production/**/*.js")
         .pipe(uglify())
         //.pipe(gulp.dest('objekter/production/'))

     gutil.log("all done");
 });


 // Deploy production folder to ftp server: 

 gulp.task('deploy', function() {

     var conn = ftp.create({
         host: 'u13dfs6.nixweb09.dandomain.dk',
         user: 'u13dfs6',
         password: 'x3pXLTtVY',
         parallel: 3,
         log: gutil.log
     });

     gutil.log(conn);

     var globs = [
         /*'src/**',
         'css/**',
         'js/**'*/
         'objekter/production/**',
         '*.*'
     ];

     gutil.log();
     // using base = '.' will transfer everything to /public_html correctly 
     // turn off buffering in gulp.src for best performance 


     return gulp.src(globs, {
             cwd: 'objekter/production/**',
             buffer: false
         })
         .pipe(conn.differentSize('/www/')) // only upload differrentSize files 
         .pipe(conn.dest('/www/'));

 });

 //Hold øje med ændringer i html, css og js filer --> reload og concat (js / css): 

 gulp.task('watch', function() {
     gulp.watch(['objekter/development/**/*.js', 'objekter/development/**/*.html', 'objekter/development/**/*.css'], ['reload']);
     gulp.watch(['components/*.css'], ['reload', 'css']);
     gulp.watch(['components/*.js'], ['reload', 'js']);

 });


 gulp.task('connect', function() {
     connect.server({
         root: 'objekter/development/',
         livereload: true
     });
     gutil.log("Hej fra connect");
 });

 gulp.task('default', ['js', 'connect', 'watch', 'log']);
