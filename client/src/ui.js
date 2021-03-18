export const DOM = {
	minSize: document.getElementById("minSize"),
	groupNames: document.getElementById("groupNames"),
	groupList: document.querySelector(".group-list"),
	createGroupsForm: document.querySelector(".create-groups"),
	createGroupsButton: document.querySelector(".create-groups__button"),
};

export const createUserElement = name => {
	const userElement = document.createElement("li");
	userElement.textContent = name;
	return userElement;
};

export const createGroupElement = (group, groupIndex) => {
	// Create group element
	const groupElement = document.createElement("ul");

	// Create and add group title
	const groupTitleElement = document.createElement("h3");
	groupTitleElement.textContent = `Group ${groupIndex}`;
	groupElement.appendChild(groupTitleElement);

	// Create and add user elements
	group.forEach(name => {
		const userElement = createUserElement(name);
		groupElement.appendChild(userElement);
	});

	return groupElement;
};

export const displayGroups = groups => {
	clearGroupList();
	groups.forEach((group, index) => {
		DOM.groupList.appendChild(createGroupElement(group, index + 1));
	});
}

export const clearGroupList = () => {
	while (DOM.groupList.firstChild) {
		DOM.groupList.removeChild(DOM.groupList.firstChild);
	}
};
