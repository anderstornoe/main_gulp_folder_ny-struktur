#!/bin/bash
sep='---------------'

# This processes the main-folder:
echo ""
echo $sep "Processing:" ${PWD##*/} $sep
git commit -a -m "autoCommit by terminal"
git push origin master

# This processes the object-folders:
for d in objekter/development/*; do
	df=${d##*/}  # extracting the folder-names
	# echo $d
	# echo $df
	if [ "$df" != "library" ]
	then
		echo ""
		echo $sep "Processing:" $df $sep
		git -C $d commit -a -m "autoCommit by terminal" 
		git -C $d push origin master
	fi
done

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
