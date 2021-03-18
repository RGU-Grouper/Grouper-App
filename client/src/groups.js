// Grouping Functions

import { shuffle } from './utils.js';
import { DOM, displayGroups } from './ui.js';

// Get minimum users per group from user input
const getMinimumSize = () => DOM.minSize.value;

// Get list of users names from user input
const getNameList = () => {
	const nameNodes = document.querySelectorAll(".user__name");
	const nameList = [...nameNodes].map(node => node.textContent);
	shuffle(nameList);
	return nameList;
};

// Assign users to groups
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
