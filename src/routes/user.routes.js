const {Router} = require('express');
const fs = require('fs');
const short = require('short-uuid');
const {getUsers, getUsersID, updateUser, deleteUser} = require('../utils/users.utils.js')

const router = Router();

router.get('/', async (req, res) => {
    const users = getUsers();
    res.status(200).json({data: users})
});

router.post('/', async (req, res) => {
    try {
        // This is how you get the data from the front-end
        const {user} = req.body;

        fs.appendFileSync("users.csv", `${short.generate()},${Object.values(user).toString()}\n`)

        res.status(201).json({message: "Account successfully saved!"})
    } catch (e) {
        res.status(500).json({errorText: e.toString(), message: "Something went wrong on server"})
    }
});

router.get('/:userId', async (req, res) => {
    const user = getUsersID();
    return res
    .status(200)
    .json({data:user})
});


router.put('/:userID',async (req, res)=>{
    const userData = req.body
    const userID = req.params.userID
    updateUser(userID, userData)
    res.status(200).json({message:"user was updated"})

})

router.delete('/:userID', async (req, res)=>{
   const userID = req.params.userID
   deleteUser(userID)
   res.status(200).json({message:"user deleted"})
})

module.exports = router;

//Assignment 
/*How to change the name of a user and save
How to delete a user and save */