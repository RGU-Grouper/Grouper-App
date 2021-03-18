// User Interface Functions

// Looking up HTML elements is slow and so should be looked for once and a reference stored
export const DOM = {
	usersForm: document.querySelector(".users__form"),
	usersMinSizeInput: document.querySelector(".users__min-size-input"),
	usersNameInput: document.querySelector(".users__name-input"),
	usersList: document.querySelector(".users__list"),
	usersAddUser: document.querySelector(".users__add-user"),
	usersCreateGroups: document.querySelector(".users__create-groups"),
	groupsList: document.querySelector(".groups__list"),
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
	groupElement.classList.add("groups__group");

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
		DOM.groupsList.appendChild(createGroupElement(group, index + 1));
	});
}

// Remove all group elements from the group-list
export const clearGroupList = () => {
	while (DOM.groupsList.firstChild) {
		DOM.groupsList.removeChild(DOM.groupsList.firstChild);
	}
};

// Adds a user to the user-list
export const addUser = () => {
	const name = DOM.usersNameInput.value;
	DOM.usersNameInput.value = "";
	DOM.usersNameInput.focus();
	if (name === "") return;

	const userElement = DOM.userTemplate.content.cloneNode(true);
	userElement.querySelector(".user__name").textContent = name;
	userElement.querySelector(".user__remove").onclick = removeUser;
	DOM.usersList.appendChild(userElement);
	// clearUserList();
};

// Removes a user from the user-list
export const removeUser = event => {
	DOM.usersList.removeChild(event.target.parentNode);
};

// Remove all users from the user-list
const clearUserList = () => {
	while (DOM.usersList.firstChild) {
		DOM.usersList.removeChild(DOM.usersList.firstChild);
	}
};
