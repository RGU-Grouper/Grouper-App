import User from "./user.js";
import { get, post } from "./httpRequests.js";

class Grouper {
	constructor() {
		this.userList = [];
		this.groups = [];
		this.currentGroupsEmailed = false;
	}

	// Add a user to the user-list
	addUser(name, email) {
		const existingUsersNames = this.userList.map(user => user.name);

		if (existingUsersNames.includes(name)) {
			console.log("User already exists with that name.");
			return false;
		}
		else {
			const user = new User(name, email);
			this.userList.push(user);
			return true;
		}
	}

	// Remove a user from the user-list
	removeUser(name) {
		const user = this.userList.find(u => u.name === name);
		if (user) {
			const index = this.userList.indexOf(user);
			this.userList.splice(index, 1);
			return true;
		}
		else {
			return false;
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
			}
			else {
				this.groups[groupIndex] = [user];
			}
		});

		this.currentGroupsEmailed = false;
	}
	
	async emailGroups() {
		if (this.currentGroupsEmailed) {
			console.log("Current groups have already been emailed.");
			return false;
		}
		
		const res = await post("/group", { data: this.groups });

		if (!res.data) {
			console.log("Failed to email users.");
			return false;
		}

		console.log("Users emailed successfully.");
		this.currentGroupsEmailed = true;
		return true;
	}
}

export default class GrouperUI extends Grouper {
	constructor() {
		super();

		this.$userTemplate = document.getElementById("user-template");
		this.$userList = document.querySelector(".users__list");
		this.$usersNameInput = document.querySelector(".users__name-input");
		this.$usersEmailInput = document.querySelector(".users__email-input");
		this.$usersForm = document.querySelector(".users__form");
		this.$usersAddUser = document.querySelector(".users__add-user");
		this.$usersCreateGroups = document.querySelector(".users__create-groups");
		this.$usersMinSizeInput = document.querySelector(".users__min-size-input");
		this.$groupsList = document.querySelector(".groups__list");
		this.$groupsEmail = document.querySelector(".groups__email");

		this.$usersForm.onsubmit = event => event.preventDefault();
		this.$usersCreateGroups.onclick = this.createGroups.bind(this);
		this.$usersAddUser.onclick = this.addUser.bind(this);
		this.$groupsEmail.onclick = this.emailGroups.bind(this);
	}

	// Add a user to the user-list
	addUser() {
		const name = this.$usersNameInput.value;
		if (name === "") return;
		const email = this.$usersEmailInput.value;
		if (email === "") return;

		const success = super.addUser(name, email);
		if (!success) return;

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

		const success = super.removeUser(name);
		if (success) {
			this.$userList.removeChild($user);
		}
	};

	// Assign users to groups
	createGroups() {
		const minSize = this.$usersMinSizeInput.value;
		super.createGroups(minSize);

		this.displayGroups();
	}

	// Populate the group-list with group elements
	displayGroups() {
		this.clearGroupList();
		this.groups.forEach((group, index) => {
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
