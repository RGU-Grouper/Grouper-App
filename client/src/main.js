// Entry Point

import { DOM, addUser } from './ui.js';
import { createGroups } from './groups.js';

// Set UI callbacks
DOM.createGroupsForm.onsubmit = event => event.preventDefault();
DOM.createGroupsButton.onclick = createGroups;
DOM.userListButton.onclick = addUser;
