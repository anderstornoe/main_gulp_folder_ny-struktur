#!/bin/bash
sep='---------------'

dir=${PWD##*/}
echo $sep "Processing:" $dir $sep
git status

for d in objekter/development/*; do
	df=${d##*/}  # extracting the folder-names
	# echo $d
	# echo $df
	if [ "$df" != "library" ]
	then
		echo ""
		echo $sep "Processing:" $df $sep
		git -C $d status
	fi
done

# README:
# When you want to run the command, you do so by opening a terminal and navigate to the main_gulp_folder_ny-struktur (or the same folder where 
# the file "autoStatus.sh" is located), and then issue the command:
#
# 		./autoStatus.sh
#
# The "./" before the filename tells the termial to execute the executable file autoStatus.sh.

# NOTE:
# If autoStatus.sh is not executable (seen by using the command "ls -l" - if the file has a trailing "x" in the user rights, eg. "drwxr-xr-x"), then 
# the file can be made executable by using the command:
# 
# 		chmod +x autoStatus.sh

