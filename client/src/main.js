import { DOM } from './ui.js';
import { createGroups } from './groups.js';

// Set UI callbacks
DOM.createGroupsForm.onsubmit = e => e.preventDefault();
DOM.createGroupsButton.onclick = createGroups;
