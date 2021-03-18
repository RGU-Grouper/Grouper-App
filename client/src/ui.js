// User Interface Functions

// Looking up HTML elements is slow and so should be looked for once and a reference stored
export const DOM = {
	minSize: document.getElementById("min-size"),
	groupNames: document.getElementById("group-names"),
	groupList: document.querySelector(".group-list"),
	createGroupsForm: document.querySelector(".create-groups"),
	createGroupsButton: document.querySelector(".create-groups__button"),
	userList: document.querySelector(".user-list"),
	userListInput: document.querySelector(".user-list__input"),
	userListButton: document.querySelector(".user-list__button"),
	userTemplate: document.getElementById("user-template"),
};

// Create an element to display a group member
export const createGroupUserElement = name => {
	const userElement = document.createElement("li");
	userElement.textContent = name;
	return userElement;
};

// Create an element to display a group of user elements
export const createGroupElement = (group, groupIndex) => {
	// Create group element
	const groupElement = document.createElement("ul");

	// Create and add group title
	const groupTitleElement = document.createElement("h3");
	groupTitleElement.textContent = `Group ${groupIndex}`;
	groupElement.appendChild(groupTitleElement);

	// Create and add user elements
	group.forEach(name => {
		const userElement = createGroupUserElement(name);
		groupElement.appendChild(userElement);
	});

	return groupElement;
};

// Populate the group-list with group elements
export const displayGroups = groups => {
	clearGroupList();
	groups.forEach((group, index) => {
		DOM.groupList.appendChild(createGroupElement(group, index + 1));
	});
}

// Remove all group elements from the group-list
export const clearGroupList = () => {
	while (DOM.groupList.firstChild) {
		DOM.groupList.removeChild(DOM.groupList.firstChild);
	}
};

// Adds a user to the user-list
export const addUser = () => {
	const name = DOM.userListInput.value;
	DOM.userListInput.value = "";
	DOM.userListInput.focus();
	if (name === "") return;

	const userElement = DOM.userTemplate.content.cloneNode(true);
	userElement.querySelector(".user__name").textContent = name;
	userElement.querySelector(".user__remove").onclick = removeUser;
	DOM.userList.appendChild(userElement);
	// clearUserList();
};

// Removes a user from the user-list
export const removeUser = event => {
	DOM.userList.removeChild(event.target.parentNode);
};

// Remove all users from the user-list
const clearUserList = () => {
	while (DOM.userList.firstChild) {
		DOM.userList.removeChild(DOM.userList.firstChild);
	}
};
