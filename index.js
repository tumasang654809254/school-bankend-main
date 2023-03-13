const express = require("express");
const bodyParser = require("body-parser")
const fs = require('fs');

const userRouter = require('./src/routes/user.routes')
const courseRouter = require('./src/routes/course.routes')
const lecturersRouter = require('./src/routes/lecturers.routes')

// Check if database file exist
// If it doesn't create a new one
// Let's check if the database exist, if it doesn't create a new database
const exist = fs.existsSync('users.csv');

if (!exist) {
    fs.writeFileSync('users.csv', "ID,Name,Email,Age\n")
}

//check if the database file for courses exist
//if not we create a new one
const exists = fs.existsSync('courses.csv');
if(!exists){
    fs.writeFileSync('courses.csv', 'ID, title, courseCode, level')
}

//check if the database file for lecturers exist
//if not we create a new one
const existLecturer = fs.readFileSync('lecturers.csv')
if(!existLecturer){
    fs.writeFileSync('lecturers.csv', 'ID,Name,Email,Phone,Courses')
}


const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// TOD0: USER CORS MIDDLE WARE

// Initalize routes
app.use('/users', userRouter);
app.use('/courses', courseRouter);
app.use('/lecturers', lecturersRouter);

//for users
app.get('/', (req, res) => {
    res.json({message: "This is a School management API"})
})




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening to: ${PORT}`)
})