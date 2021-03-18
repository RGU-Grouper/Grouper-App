// Grouping Functions

import { shuffle } from './utils.js';
import { DOM, displayGroups } from './ui.js';

// Get minimum users per group from user input
const getMinimumSize = () => DOM.minSize.value;

const getNameList = () => {
	const nameNodes = document.querySelectorAll(".user__name");
	const nameList = [...nameNodes].map(node => node.textContent);
	shuffle(nameList);
	return nameList;
};

// Assign users to groups THIS IS NOT WORKING YET AND IS A MESS, Just put it in so people could help
export const createGroups = () => {
	const nameList = getNameList();
	const minSize = getMinimumSize();

	console.log(minSize)
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
