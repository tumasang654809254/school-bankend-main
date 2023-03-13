const {Router} = require('express');
const fs = require('fs');
const short = require('short-uuid');
const {getCourses, getCourseID, updateCourse, deleteCourse} = require('../utils/courses.utils');

const router  = Router();

router.get('/', async (req, res)=>{
    const courses = getCourses();
    res.status(200).json({data: courses})
})

router.post('/', async (req, res)=>{
    try{
        const course = req.body
        fs.appendFileSync("courses.csv", `${short.generate()},${Object.values(course).toString()}\n`)
        res.status(200).json({message:"Courses successfuly saved"})
    }catch(e){
        res.status(500).json({errorText: e.toString(), mesage: 'server is not responding'});
    }
})

//Add a course to my courses
router.get('/:id', (rq, res)=>{ 
    const course = getCourseID
    res.status(200).json({data:course})
})

router.put('/:id', (req, res)=>{
    const courseData = req.body;
    const id = req.params.id;
    updateCourse(id, courseData);
    res.status(200).json({message:"course was updated"})
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    deleteCourse(id)
    res.status(200).json({message:"course deleted"});
})

module.exports = router;