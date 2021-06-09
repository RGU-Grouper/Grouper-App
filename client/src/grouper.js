import User from "./user.js";

class Grouper {
	constructor() {
		this.userList = [];
		this.groups = [];
		this.currentGroupsEmailed = false;
	}

	// Add a user to the user-list, returns integer error codes, 0 for success
	addUser(name, email) {
		const existingUsersNames = this.userList.map((user) => user.getName());
		const existingUsersEmails = this.userList.map((user) => user.getEmail());

		if (existingUsersNames.includes(name)) {
			console.log("User already exists with that name.");
			return 1;
		} else if (existingUsersEmails.includes(email)) {
			console.log("User already exists with that email.");
			return 2;
		} else {
			const user = new User(name, email);
			this.userList.push(user);
			return 0;
		}
	}

	// Remove a user from the user-list, returns integer error codes, 0 for success
	removeUser(name) {
		const user = this.userList.find((u) => u.getName() === name);
		if (user) {
			const index = this.userList.indexOf(user);
			this.userList.splice(index, 1);
			return 0;
		} else {
			return 1;
		}
	}

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

	// Populate the group-list with group elements
	createGroups(minSize) {
		const userList = this.getShuffledUserList();

		// Calculate the number of groups
		const groupCount = Math.floor(userList.length / minSize);

		// Reset groups
		this.groups = [];

		// Loop through users and add to a group or create a new one
		userList.forEach((user, index) => {
			const groupIndex = index % groupCount;

			if (this.groups[groupIndex]) {
				this.groups[groupIndex].push(user);
			} else {
				this.groups[groupIndex] = [user];
			}
		});

		this.currentGroupsEmailed = false;
	}

	// Send an email to each user with their group number, returns integer error codes, 0 for success
	async emailGroups() {
		if (!this.groups || this.groups.length === 0) {
			console.log("You must create groups from the user list before emailing.");
			return 1;
		}

		if (this.currentGroupsEmailed) {
			console.log("Current groups have already been emailed.");
			return 2;
		}

		let res = await fetch("/group", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data: this.groups }),
		});

		if (res.status !== 200) {
			console.log("Failed to email users.");
			return 3;
		}

		console.log("Users emailed successfully.");
		this.currentGroupsEmailed = true;
		return 0;
	}

	// Send an email to each user with the name of another random user. Each user should emailed and referenced once. Returns integer error codes, 0 for success
	async secretSanta() {
		if (this.userList.length < 3) {
			console.log("At least 3 users required in the user list.");
			return 1;
		}

		const shuffledUserList = this.getShuffledUserList();

		let res = await fetch("/group/santa", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data: shuffledUserList }),
		});

		if (res.status !== 200) {
			console.log("Failed to email users.");
			return 2;
		}

		console.log("Users emailed successfully.");
		return 0;
	}
}

export default class GrouperUI extends Grouper {
	constructor() {
		super();

		this.$userTemplate = document.getElementById("user-template");
		this.$userList = document.querySelector(".user-list");
		this.$usersForm = document.querySelector(".users__form");

		this.$usersNameInput = document.querySelector(".add-user__name-input");
		this.$usersEmailInput = document.querySelector(".add-user__email-input");
		this.$usersAddUser = document.querySelector(".add-user__submit");

		this.$usersMinSizeInput = document.querySelector(".create-groups__min-size-input");
		this.$usersCreateGroups = document.querySelector(".create-groups__submit");

		this.$usersSecretSanta = document.querySelector(".create-groups__secret-santa");

		this.$groupsList = document.querySelector(".groups__list");
		this.$groupsEmail = document.querySelector(".groups__email");
		this.$popup = document.querySelector(".popup");

		this.$usersForm.onsubmit = (event) => event.preventDefault();
		this.$usersCreateGroups.onclick = this.createGroups.bind(this);
		this.$usersAddUser.onclick = this.addUser.bind(this);
		this.$usersSecretSanta.onclick = this.secretSanta.bind(this);
		this.$groupsEmail.onclick = this.emailGroups.bind(this);

		this.popupTimeout = null;
	}

	// Add a user to the user-list
	addUser() {
		const name = this.$usersNameInput.value;
		if (name === "") {
			this.showPopup("Please enter a user name.");
			return;
		}
		const email = this.$usersEmailInput.value;
		if (email === "") {
			this.showPopup("Please enter a valid email address.");
			return;
		}

		const error = super.addUser(name, email);
		if (error) {
			if (error === 1) {
				this.showPopup("User already exists with that name. Please select another.");
			} else if (error === 2) {
				this.showPopup("User already exists with that email. Please select another.");
			} else {
				this.showPopup("An error occured while attempting to add user.");
			}
			return;
		}

		this.$usersNameInput.value = "";
		this.$usersEmailInput.value = "";
		this.$usersNameInput.focus();

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

		const error = super.removeUser(name);
		if (error) {
			this.showPopup("An error occured while attempting to remove user.");
		} else {
			this.$userList.removeChild($user);
		}
	}

	// Assign users to groups
	createGroups() {
		const minSize = this.$usersMinSizeInput.value;
		if (!minSize) {
			this.showPopup("Please enter a minimum group size.");
			return;
		}

		super.createGroups(minSize);

		this.clearGroupList();
		this.groups.forEach((group, index) => {
			const $groupElement = this.createGroupElement(group, index + 1);
			this.$groupsList.appendChild($groupElement);
		});

		this.showPopup("Random groups have been created!");
	}

	// Remove all group elements from the group-list
	clearGroupList() {
		while (this.$groupsList.firstChild) {
			this.$groupsList.removeChild(this.$groupsList.firstChild);
		}
	}

	// Send an email to each user with their group number
	async emailGroups() {
		const error = await super.emailGroups();
		if (error) {
			if (error === 1) {
				this.showPopup("You must create groups from the user list before emailing.");
			} else if (error === 2) {
				this.showPopup("Current groups have already been emailed.");
			} else if (error === 3) {
				this.showPopup("Failed to email users.");
			}
			return;
		}

		this.showPopup("Groups emailed successfully!");
	}

	// Send an email to each user with the name of another random user. Each user should emailed and referenced once.
	async secretSanta() {
		const error = await super.secretSanta();
		if (error) {
			if (error === 1) {
				this.showPopup("At least 3 users required in the user list.");
			} else if (error === 2) {
				this.showPopup("Failed to email users.");
			}
			return;
		}

		this.showPopup("Secret Santa emailed successfully!");
	}

	// Create an element to display a group of user elements
	createGroupElement(group, groupIndex) {
		// Create group element
		const $groupElement = document.createElement("ul");
		$groupElement.classList.add("groups__group");

		// Create and add group title
		const $groupTitleElement = document.createElement("h3");
		$groupTitleElement.classList.add("groups__group-title");
		$groupTitleElement.textContent = `Group ${groupIndex}`;
		$groupElement.appendChild($groupTitleElement);

		// Create and add user elements
		group.forEach((user) => {
			const $userElement = document.createElement("li");
			$userElement.textContent = user.getName();
			$groupElement.appendChild($userElement);
		});

		return $groupElement;
	}

	// Display a popup and set the text. Will show for 3 seconds
	showPopup(text) {
		if (this.popupTimeout) {
			clearTimeout(this.popupTimeout);
		}

		this.$popup.classList.add("popup--active");
		this.$popup.textContent = text;
		this.popupTimeout = setTimeout(this.hidePopup.bind(this), 3000);
	}

	// Hides the popup if active and clears any unresolved timeouts
	hidePopup() {
		if (this.popupTimeout) {
			clearTimeout(this.popupTimeout);
		}

		this.$popup.classList.remove("popup--active");
	}
}
