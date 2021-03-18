// Entry Point

import { DOM, addUser } from './ui.js';
import { createGroups } from './groups.js';

// Set UI callbacks
DOM.usersForm.onsubmit = event => event.preventDefault();
DOM.usersCreateGroups.onclick = createGroups;
DOM.usersAddUser.onclick = addUser;
