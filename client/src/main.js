// Add user to list
const addUser = (name) => {

};

// Remove user from list
const removeUser = (name) => {

};

// Set minimum users per group
function setMinimumSize() {
    minSize = document.getElementById("minSize").value;
    return minSize 
};

//split names function
function splitNames(){

    //Get groups from text box
   var str = document.getElementById("groupNames").value;
   //Splits groups up each space
   var names = str.split(" ");

   //Returns names
   return names;
};

// Assign users to groups THIS IS NOT WORKING YET AND IS A MESS, Just put it in so people could help
const createGroups = () => {

    //add names to a variable
    var n = splitNames()
    
    //adds minSize to a variable
    var ms = setMinimunSize()

    //Works out the number of groups
    groupNumber = Math.floor(n.length / ms)
    
    //counters
    var counter = 0;
    

    //Variable to say if the groupNumber is even or odd, this is set to false each loop
    var even = false;

    //Creates array that is going to be a matrix with all the groups in it
    var groups = [];

    //makes sure to add remainders to a group
    if (groupNumber < n.length / ms & even == false){

        //counter
        var i;
        //Adds people to group and the extra person left over
        for (i = 0; i < groupNumber; i++){

            for (i2 = 0; i2 < ms + 1; i2++){
                current = Math.floor(Math.random() * n.length); 
    
                //Creates new array in matrix
                groups[counter] = new Array(counter);

                //Adds names to the array in the matrix
                groups[counter.push(n[current])];

                //Adds one to counter
                counter = counter + 1;
                even = true
            }
        }
    } else {
        //counter
        var i;
        //Adds people to groups if it is even
        for (i = 0; i < groupNumber; i++){

            for (i2 = 0; i2 < ms + 1; i2++){
                current = Math.floor(Math.random() * n.length); 
    
                //Creates new array in matrix
                groups[counter] = new Array(counter);

                //Adds names to the array in the matrix
                groups[counter.push(n[current])];

                //Adds one to counter
                counter = counter + 1;
            }  
        }
        
    }
    console.log(groups)
} ;