
//we convert the course.csv data to a json
function convertCSVToObject(csv) {
   console.log(csv)
    //split the data by the new line character disclaimer
    const courseFileData = csv.split('\n');

    //get the headers from the csv file 
    const keys = courseFileData[0].split(',').map(k => k.trim().toLowerCase());

    //slice through the file
    const courseRecords = courseFileData.slice(1);

    //we remove empty strings by returnx an array of elements dt passes the condition
    const courseRecordStrings = courseRecords.filter((courseString) => Boolean(courseString));

   return courseRecordStrings.map((courseString)=>{
     const  courseField = courseString.split(',');
     const courseRecord = {}

     //keys = [id, title, courseCode, level]
     keys.forEach((key, index)=>{
        courseRecord[key] = courseField[index]
     })
     return courseRecord;
   })
}
module.exports = {convertCSVToObject};