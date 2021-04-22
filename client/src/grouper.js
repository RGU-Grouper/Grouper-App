import User from "./user.js";

export default class Grouper {
	constructor() {
		this.$userTemplate = document.getElementById("user-template");
		this.$userList = document.querySelector(".users__list");
		this.$usersNameInput = document.querySelector(".users__name-input");
		this.$usersEmailInput = document.querySelector(".users__email-input");
		this.$usersForm = document.querySelector(".users__form");
		this.$usersAddUser = document.querySelector(".users__add-user");
		this.$usersCreateGroups = document.querySelector(".users__create-groups");
		this.$groupsList = document.querySelector(".groups__list");
		this.$usersMinSizeInput = document.querySelector(".users__min-size-input");

		this.$usersForm.onsubmit = event => event.preventDefault();
		this.$usersCreateGroups.onclick = this.createGroups.bind(this);
		this.$usersAddUser.onclick = this.addUser.bind(this);

		this.userList = [];
	}

	// Add a user to the user-list
	addUser() {
		const name = this.$usersNameInput.value;
		if (name === "") return;
		const email = this.$usersEmailInput.value;
		if (email === "") return;

		const existingUsersNames = this.userList.map(user => user.name);
		if (existingUsersNames.includes(name)) {
			console.log("User already exists with that name.");
			return;
		}

		this.$usersNameInput.value = "";
		this.$usersEmailInput.value = "";
		this.$usersNameInput.focus();

		const user = new User(name, email);
		this.userList.push(user);

		const $userElement = this.$userTemplate.content.cloneNode(true).firstElementChild;
		$userElement.setAttribute("data-id", name);
		$userElement.querySelector(".user__name").textContent = name;
		$userElement.querySelector(".user__email").textContent = email;
		$userElement.querySelector(".user__remove").onclick = this.removeUser.bind(this);
		this.$userList.appendChild($userElement);
	}

	// Remove a user from the user-list
	removeUser(event) {
		const $user = event.target.parentNode;
		const name = $user.dataset.id;

		const user = this.userList.find(u => u.name === name);
		if (user) {
			const index = this.userList.indexOf(user);
			this.userList.splice(index, 1);
			this.$userList.removeChild($user);
		}
	};

	// Return a shuffled copy of the user-list
	getShuffledUserList() {
		// Creates a copy of the array, doesn't change the original
		const shuffledUserList = this.userList.concat([]);

		let currentIndex = shuffledUserList.length;

		while (currentIndex !== 0) {
			const randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			const temp = shuffledUserList[currentIndex];
			shuffledUserList[currentIndex] = shuffledUserList[randomIndex];
			shuffledUserList[randomIndex] = temp;
		}

		return shuffledUserList;
	}

	// Assign users to groups
	createGroups() {
		const userList = this.getShuffledUserList();
		const minSize = this.$usersMinSizeInput.value;

		// Calculate the number of groups
		const groupCount = Math.floor(userList.length / minSize);

		// Matrix to hold all groups
		const groups = [];

		// Loop through users and add to a group or create a new one
		userList.forEach((user, index) => {
			const groupIndex = index % groupCount;

			if (groups[groupIndex]) {
				groups[groupIndex].push(user);
			}
			else {
				groups[groupIndex] = [user];
			}
		});

		// Display groups
		this.displayGroups(groups);
	}

	// Populate the group-list with group elements
	displayGroups(groups) {
		this.clearGroupList();
		groups.forEach((group, index) => {
			const $groupElement = this.createGroupElement(group, index + 1);
			this.$groupsList.appendChild($groupElement);
		});
	}

	// Remove all group elements from the group-list
	clearGroupList() {
		while (this.$groupsList.firstChild) {
			this.$groupsList.removeChild(this.$groupsList.firstChild);
		}
	}

	// Create an element to display a group of user elements
	createGroupElement(group, groupIndex) {
		// Create group element
		const $groupElement = document.createElement("ul");
		$groupElement.classList.add("groups__group");

		// Create and add group title
		const $groupTitleElement = document.createElement("h3");
		$groupTitleElement.textContent = `Group ${groupIndex}`;
		$groupElement.appendChild($groupTitleElement);

		// Create and add user elements
		group.forEach(user => {
			const $userElement = document.createElement("li");
			$userElement.textContent = user.name;
			$groupElement.appendChild($userElement);
		});

		return $groupElement;
	}
}
