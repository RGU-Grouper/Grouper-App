// Add user to list
const addUser = (name) => {

};

// Remove user from list
const removeUser = (name) => {

};

// Set minimum users per group
const setMinimumSize = (size) => {
    minSize = document.getElementById("minSize").value;
    console.log(minSize); 
};

// Assign users to groups
const createGroups = () => {

    var str = document.getElementById("groupNames").value;
    var names = str.split(" ");
    
    console.log(names); 

    groupNumber = Math.floor(names.length / setMinimunSize.minSize)
    
    var i;
    for (i = 0; i < groupNumber; i++){
        current = Math.floor(Math.random() * names.length); 
        group.push(names[current])
    }

} ;

// CHANGES  
