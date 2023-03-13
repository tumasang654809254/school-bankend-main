const {Router} = require('express');
const fs = require('fs');
const short = require('short-uuid');
const {getLecturers, getLecturerID, updateLecturer, deleteLecturer} = require('../utils/lecturers.utils');

const router = Router();

router.get('/', async (req, res)=>{
    const lecturers = getLecturers();
    res.status(200).json({data: lecturers})
})

router.post('/', async (req, res)=>{
    try{
        const lecturer = req.body.lecturers
        fs.appendFileSync("lecturers.csv", `${short.generate()},${Object.values(lecturer).toString()}\n`)
        res.status(200).json({message:"lecturers successfuly saved"})
    }catch(e){
        res.status(500).json({errorText: e.toString(), mesage: 'server is not responding'});
    }
})

//Add a course to my courses
router.get('/:id', (req, res)=>{ 
    const lecturer = getLecturerID
    res.status(200).json({data:lecturer})
})

router.put('/:id', (req, res)=>{
    const lecturerData = req.body;
    const id = req.params.id;
    updateLecturer(id, lecturerData);
    res.status(200).json({message:"lecturer was updated"})
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    deleteLecturer(id)
    res.status(200).json({message:"lecturer deleted"});
})

module.exports = router;