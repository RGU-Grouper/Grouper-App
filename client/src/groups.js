// Grouping Functions

import { shuffle } from './utils.js';
import { DOM, displayGroups } from './ui.js';

// Get minimum users per group from user input
const getMinimumSize = () => DOM.minSize.value;

// Get names of potential group members from user input
const getNameList = () => { 
	//Get user list from text box as string
	const nameString = DOM.groupNames.value;
	
	// Split string of names into a list
	const nameList = nameString.split(" ");

	// Shuffle the list of names into a random order
	shuffle(nameList);

	// Returns list of names
	return nameList;
};

// Assign users to groups THIS IS NOT WORKING YET AND IS A MESS, Just put it in so people could help
export const createGroups = () => {
	const nameList = getNameList();
	const minSize = getMinimumSize();

	// Calculate the number of groups
	const groupCount = Math.floor(nameList.length / minSize);

	// Matrix to hold all groups
	const groups = [];

	nameList.forEach((name, index) => {
		const groupIndex = index % groupCount;

		if (groups[groupIndex]) {
			groups[groupIndex].push(name);
		}
		else {
			groups[groupIndex] = [name];
		}
	});

	// Display groups
	displayGroups(groups);
};
	
// //makes sure to add remainders to a group
// if (groupNumber < nameList.length / minSize && even == false){
// 	//Adds people to group and the extra person left over
// 	for (let i = 0; i < groupNumber; i++){
// 		for (let j = 0; j < minSize + 1; j++){
// 			const current = Math.floor(Math.random() * nameList.length); 

// 			//Creates new array in matrix
// 			groups[counter] = new Array(counter);

// 			//Adds nameList to the array in the matrix
// 			groups[counter.push(nameList[current])];

// 			//Adds one to counter
// 			counter = counter + 1;
// 			even = true
// 		}
// 	}
// } else {
// 	//Adds people to groups if it is even
// 	for (let i = 0; i < groupNumber; i++){
// 		for (let j = 0; j < minSize + 1; j++){
// 			const current = Math.floor(Math.random() * nameList.length); 
	
// 			//Creates new array in matrix
// 			groups[counter] = new Array(counter);

// 			//Adds names to the array in the matrix
// 			groups[counter.push(nameList[current])];

// 			//Adds one to counter
// 			counter = counter + 1;
// 		}  
// 	}
// }
