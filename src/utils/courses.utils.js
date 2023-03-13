const fs = require("fs");
const {convertCSVToObject} = require("./courseIndex")

//function to read and get the courses
function getCourses(){
    const courseFile = fs.readFileSync('courses.csv');
     return convertCSVToObject(courseFile.toString())
}

function getCourseID(id){
    const courses = getCourses()
    return courses.find((course)=>course.id == id )
}


function updateCourse(id, payload){
    const updateCourses = getCourses().map((course)=>{
        console.log(course)
        if(course.id == id){
             Object.assign(course , payload)
        }
        return course
    });
    console.log(updateCourses)
    saveCourses(updateCourses)
}

function deleteCourse(id){
    const deleteCourses = getCourses.find((course) => course.id !== id)
    saveCourses(deleteCourses)
}

function saveCourses(course){
    if(!Array.isArray){
        console.log('courses must be an array')
    }
    fs.appendFileSync("users.csv", Object.values(course).toString() + "\n")
}

module.exports = {getCourses, getCourseID, updateCourse, deleteCourse};