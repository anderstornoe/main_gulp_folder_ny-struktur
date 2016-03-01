 var gulp = require('gulp'),
     gutil = require('gulp-util'),
     gulpif = require('gulp-if'),
     uglify = require('gulp-uglify'),
     connect = require('gulp-connect'),
     minifyCSS = require('gulp-minify-css'),
     minifyHTML = require('gulp-minify-html'),
     concat = require('gulp-concat'),
     jshint = require('gulp-jshint'),
     ftp = require('vinyl-ftp'),
     stripDebug = require('gulp-strip-debug');

 var jsSources,
     cssSources,

     jsSources = [
         'bower_components/jquery/dist/jquery.js',
         'bower_components/jquery-ui/jquery-ui.js',
         'bower_components/bootstrap/dist/js/bootstrap.js',
         'bower_components/jquery-ui-touch-punch/jquery.ui.touch-punch.js',
         'bower_components/jquery-ui-sortable-animation/jquery.ui.sortable-animation.js'

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



 //ALT DER VEDRØRER PRODUCTION, TRIMMING OG DEPLOYMENT:  POSSIBLE ARGUMENT-CALL FROM TERMINAL: "gulp copy_production --option objekter/development/My_Object_Folder_Name"
 gulp.task('copy_production', function() {

     var objSrcFolder = "**";
     var objDistFolder = "";
     var objPath = process.argv[4]; // Get the argument "objekter/development/My_Object_Folder_Name" from the call.

     // gutil.log("copy_production - objPath 1: " + objPath );  //  TILFOEJET d. 29-02-2016

     if (typeof objPath !== "undefined") { // Only executed if an argument is given in the call to the gulp-task.
         objPath = String(objPath);
         objSrcFolder = String(objPath.split("/")[2]); // Get "My_Object_Folder_Name" from the objPath.
         objDistFolder = objSrcFolder;
     }
     gutil.log("copy_production - objPath: " + String(objPath) + ", objSrcFolder: " + objSrcFolder + ", objDistFolder: " + objDistFolder);

     //gutil.log("Its time to production mode it!");
     //objekter/kemi_drag/builds/development/
     gulp.src(['objekter/development/' + objSrcFolder + '/*'])

     .pipe(gulp.dest('objekter/production/' + objDistFolder))
         //.pipe(wait(1500))
         //gulp.task('trim_files');

     if (typeof objPath === "undefined") { // Only executed if an argument is NOT given in the call to the gulp-task, eg. call: "gulp copy_production"
         gulp.src(['objekter/library/**/*'])
             .pipe(gulp.dest('objekter/production/library'))
     }
     //.pipe(wait(1500))
     //gulp.task('trim_files');

 });


 // POSSIBLE ARGUMENT-CALL FROM TERMINAL: "gulp deploy --option objekter/development/My_Object_Folder_Name"
 gulp.task('trim_files', function() {

     var objSrcFolder = "**";
     var objDistFolder = "";
     var objPath = process.argv[4]; // Get the argument "objekter/development/My_Object_Folder_Name" from the call.

     if (typeof objPath !== "undefined") { // Only executed if an argument is given in the call to the gulp-task.
         objPath = String(objPath);
         objSrcFolder = String(objPath.split("/")[2]); // Get "My_Object_Folder_Name" from the objPath.
         objDistFolder = objSrcFolder;
     }
     gutil.log("trim_files - objPath: " + String(objPath) + ", objSrcFolder: " + objSrcFolder + ", objDistFolder: " + objDistFolder);

     gulp.src("objekter/production/" + objSrcFolder + "/*.css")
         //.pipe(wait(1500))
         .pipe(minifyCSS({
             keepBreaks: false
         }))
         .pipe(gulp.dest('objekter/production/' + objDistFolder))

     gulp.src("objekter/production/" + objSrcFolder + "/*.html")
         .pipe(minifyHTML({
             quotes: true
         }))
         .pipe(gulp.dest('objekter/production/' + objDistFolder))

     gulp.src("objekter/production/" + objSrcFolder + "/*.js")
         .pipe(uglify())
         .pipe(stripDebug())
         .pipe(gulp.dest('objekter/production/' + objDistFolder))

     gutil.log("all done");
 });


 // Deploy production folder to ftp server. POSSIBLE ARGUMENT-CALL FROM TERMINAL: "gulp deploy --option objekter/development/My_Object_Folder_Name"
 gulp.task('deploy', function() {

     var objFolder = "";
     var objPath = process.argv[4]; // Get the argument "objekter/development/My_Object_Folder_Name" from the call.

     // gutil.log("deploy - objPath 1: " + objPath + ", objFolder: " + objFolder);  //  TILFOEJET d. 29-02-2016
     if (typeof objPath === "undefined") {
         objPath = 'objekter/production';
     } else { // Only executed if an argument is given in the call to the gulp-task.

        objPath = String(objPath);
        objPath = objPath.replace('development', 'production'); //  TILFOEJET d. 29-02-2016
        objFolder = String(objPath.split("/")[2]); // Get "My_Object_Folder_Name" from the objPath.
     }
     gutil.log("deploy - objPath : " + objPath + ", objFolder: " + objFolder);

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
         // 'objekter/production/**', 
         objPath + '/**',
         '*.*'
     ];

     gutil.log();
     // using base = '.' will transfer everything to /public_html correctly 
     // turn off buffering in gulp.src for best performance 


     return gulp.src(globs, {
             cwd: objPath + '/**',
             buffer: false
         })
         //.pipe(conn.differentSize('/www/'+objFolder)) // only upload differrentSize files 
         .pipe(conn.dest('/www/' + objFolder));

 });

 // POSSIBLE CALL FROM TERMINAL: gulp pushObj --option objekter/development/My_Object_Folder_Name
 // gulp.task('pushObj', ['copy_production', 'trim_files', 'deploy']);


 //Hold øje med ændringer i html, css og js filer --> reload og concat (js / css): 

 gulp.task('watch', function() {
     gulp.watch(['objekter/development/**/*.js', 'objekter/development/**/*.html', 'objekter/development/**/*.css', 'objekter/development/**/json/*.json'], ['reload']);
     gulp.watch(['components/*.css'], ['reload', 'css']);
     gulp.watch(['components/*.js'], ['reload', 'js']);

 });


 gulp.task('connect', function() {
     connect.server({
         root: 'objekter/development/',
         // root: 'objekter/production/',   // Added to test if "things" work when copied to production. 
         livereload: true
     });
     gutil.log("Hej fra connect");
 });

 gulp.task('default', ['js', 'connect', 'watch', 'log']);
