const fs  = require('fs');
const convertCSVToObject = require("./courseIndex");


//we write a function which reads and gets all the lecturers
function getLecturers(){
    const lecturersData = fs.readFileSync('/lecturers.csv').toString()
    return convertCSVToObject(lecturersData)
}

//A function which gets a single lecturer using its id
function getLecturerID(id){
    const lecturers = getLecturers()
    return lecturers.find(lecturer=>lecturer.id == id )
}

//A function  which updates a single lecturer using its id
function updateLecturer(id, payload){
    const updateLecturers = getLecturers().map(lecturer =>{
        if(lecturer.id == id){
            Object.assign(lecturer, payload)
        }
        return lecturer
    })
    saveLecturers(updateLecturers)
}

//A function which deletes a lecturer using its given id
function deleteLecturer(id){
    const deleteLecturers = getLecturers().filter(lecturer => lecturer.id != id)
    saveLecturers(deleteLecturers)
}

//A function to save the lectureres 
function saveLecturers(lecturers){
    if(!Array.isArray(lecturers)){
        throw new error('Lecturers must be an array of lecturers')
    }

    fs.writeFileSync('lecturers.csv', 'ID,Name,Email,Phone,Courses\n')

    lecturers.forEach((lecturer)=>{
        fs.appendFileSync("lecturers.csv", `${Object.values(lecturer).toString()}\n`)
    })
}

module.exports = 
{
    getLecturers,
    getLecturerID,
    updateLecturer,
    deleteLecturer,
}