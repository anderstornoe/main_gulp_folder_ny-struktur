#!/bin/bash

sep='---------------'

count=0

declare -a pathArray 	# Array containing object-paths in your local folder, eg: "objekter/development/engB_search"
declare -a nameArray	# Array containing the object-folder name, eg: "engB_search"


echo ""
echo "Single objects:"
# This processes the object-folders:
for d in objekter/development/*; do
	df=${d##*/}  # extracting the folder-names

	# echo $d

	echo $count " - " $df  
	nameArray[$count]=$df	# Inserting folder names.
	pathArray[$count]=$d    # Inserting folder paths.
	let "count = count + 1" # Count increment by one 
done


#############################################################################################


count2=0
count3=0
declare -a totStrArray	
totStr=""				# String that contains all object-prefixes, eg. "engB" will occur more than once.
totStrUnique=""			# String that contains object-prefixes occuring one or more. Each prefix will occur once in totStrUnique.
totStrMoreThanOne=""    # String that contains object-prefixes occuring more than once. Each prefix will only occur once in totStrUnique.


for i in "${nameArray[@]}"; do  # Note: "@" or "*" reference all elements in the array
	# echo $i

	IFS='_' read -a tempArray <<< "${nameArray[$count2]}" # Create tempArray containing prefixes of the object-folders, eg. "engB" in "engB_search".

	# echo "tempArray[0]: " ${tempArray[0]}

	count2=$count2+1  # Count2 increment by one.

	totStr=$totStr"_"${tempArray[0]} # Concatenating prefix-strings to "totStr".

	if [[ $totStrUnique != *"${tempArray[0]}"* ]] # Only if the prefix is NOT contained in totStrUnique do the following... 
	then
		totStrUnique=${tempArray[0]}"_"$totStrUnique  # Concatenating prefix-strings to "totStrUnique".
		totStrArray[count3]=${tempArray[0]}  # Inserting prefixes.
		count3=$count3+1  # Count3 increment by one.
	fi

done

# for i in "${nameArray[@]}"; do
for i in "${totStrArray[@]}"; do

	numOfPrefixes=$(grep -o "$i" <<< "$totStr" | wc -l)  # Counting number of prefix "i" in "totStr".

	# echo "numOfPrefixes: " $numOfPrefixes ", i: " $i

	if (( "$numOfPrefixes" > "1" )) # If the the number of prefixes are more than one, then...
	then
		totStrMoreThanOne=$i"_"$totStrMoreThanOne	# Concatenating prefix-strings to "totStrMoreThanOne". 
	fi
done

# echo "totStrMoreThanOne: " $totStrMoreThanOne

loopNumMin=$count 	# Save the counter number for later use.
# echo "loopNumMin: " $loopNumMin

IFS='_' read -a prefixArray2 <<< "$totStrMoreThanOne" 	# Create new array "prefixArray2" containing prefixes occuring more than once (group prefixes) - each element only occur once in the array.

declare -a pathArray_loop	# Create array that will contain "group prefixes".

echo ""
echo "Groups of objects (by prefix):"
for i in "${prefixArray2[@]}"; do
	echo $count " - " $i
	pathArray_loop[$count]=$i
	let "count = count + 1"  # Count increment by one
done

loopNumMax=$count 	# Save the counter number for later use.
# echo "loopNumMax: " $loopNumMax


#############################################################################################

echo ""
echo $sep$sep$sep$sep
echo "Type the objekt-number followed by [ENTER] to deploy that particular object or group of objects:"
read objNum 

if (( $objNum < $loopNumMin ))  # If you choose an objekt-number of a single object...
then
	echo ""
	echo "Deploying: " ${nameArray[objNum]}"..."
	# echo ""
	# echo "Next time, just copy-and-paste the following line in the terminal:"
	# echo ""
	# echo "      gulp pushObj --option" ${pathArray[objNum]}
	echo ""
	echo $sep$sep$sep$sep
	
	# gulp pushObj --option ${pathArray[objNum]};   #  ACTIVATE!!!
	gulp copy_production --option ${pathArray[objNum]};
	gulp trim_files --option ${pathArray[objNum]};
	
	gulp deploy --option ${pathArray[objNum]}
fi


echo ""
if (( $objNum >= $loopNumMin )) # If you choose an objekt-number of a group of objects...
then
	for ((i=$loopNumMin;i<$loopNumMax;i++)); do  # Loop through the group objekt-numbers...
		# echo "i: " $i
		if (( "$objNum" == "$i" ))  # If the choosen objekt-number matches a group, then...
		then
			# echo "LOOP - objNum: " $objNum
			#------
			for path in "${pathArray[@]}"; do 	# For each path in pathArray do...
				if [[ $path == *"${pathArray_loop[objNum]}"* ]]  # If the path contains the prefix, then...
				then
					echo $sep$sep$sep$sep
					echo "gulp pushObj --option" $path
					echo $sep$sep$sep$sep

					# gulp pushObj --option $path   #  ACTIVATE!!!
					gulp copy_production --option $path;
					gulp trim_files --option $path;
					gulp deploy --option $path
				fi
			done
			#------
		fi
	done
fi
echo ""




# Note: "@" or "*" reference all elements in the array
# for i in "${nameArray[@]}"; do
# 	echo $i
# done


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

