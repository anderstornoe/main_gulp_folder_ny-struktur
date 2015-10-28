#!/bin/bash

gulp copy_production;
gulp trim_files;
gulp deploy

# README:
# When you want to run the command, you do so by opening a terminal and navigate to the main_gulp_folder_ny-struktur (or the same folder where 
# the file "autoPull.sh" is located), and then issue the command:
#
# 		./autoPull.sh
#
# The "./" before the filename tells the termial to execute the executeable file autoPull.sh.

# NOTE:
# If autoPull.sh is not executable (seen by using the command "ls -l" - if the file has a trailing "x" in the user rights, eg. "drwxr-xr-x"), then 
# the file can be made executable by using the command:
# 
# 		chmod +x autoPull.sh
