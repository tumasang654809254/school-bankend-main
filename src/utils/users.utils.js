
const {convertCSVTojson }= require('./')
const fs = require("fs");

//function for get Users
function getUsers(){
     //  Here we are reading user's data from the file
     const fileData = fs.readFileSync("users.csv").toString();
 
     return convertCSVTojson(fileData)
}

//function for get usersID
function getUsersID(userID){
    const users = getUsers();
    return users.find(user => user.id == userID)
}

//function to update users by id
function updateUser(id, payload) {
    const updatedUsers = getUsers().map(user => {
        if (user.id == id) {
            Object.assign(user, payload)
        }
        return user
    });
    // save users
    saveUsers(updatedUsers);
}


//function to delete users by id
function deleteUser(id){
    //here we return everyone exept the corresponding one to the given id
    const retainingUsers = getUsers().find((user)=> user.id !== id)
    saveUsers(retainingUsers)
}


//function to save users 
function saveUsers(users){
  //we make sure all the users returned as an array should be saved
  if(!Array.isArray(users)){
    throw new error('Users must be an array of users') 
  }
  fs.writeFileSync('users.csv', "ID,Name,Email,Age\n")

    users.forEach((user)=>{
        fs.appendFileSync("users.csv", `${Object.values(user).toString()}\n`)
    })
}

module.exports = {
    getUsers,
    getUsersID,
    updateUser,
    deleteUser
}