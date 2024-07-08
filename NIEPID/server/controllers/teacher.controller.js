// const loginModel=require('../model/login.model')
// const userModel=require('../model/user.model')
const userModel=require('../models/user.model')
const teacherModel=require('../models/teacher.model')
const studentModel=require('../models/student.model')
const studentDetailsModel=require('../models/studentDetails.model')
const classModel=require('../models/class.model')
const deriveHistory = require('../deriving/deriveHistory')

const jwt=require('jsonwebtoken')

const evaluateStudent=async(req,res)=>{
    const val = req.params.type
    if(val === 'personal'||val === 'social'||val === 'academic'||val === 'occupational'||val === 'recreational'){    
        val = val+"QA"
        try{
            const data = req.body
            const responce = studentModel.findOneAndUpdate(
                {regNo:data.username},//check if it is username or not
                {val:data.questions},
                {new:true}
            )
            console.log(responce)//for testing
            res.status(200).json({message:"successfully updated student"})
        }
        catch(error){
            res.status(404).send(false)
        }
    }else{
        res.status(400).json({message:"wrong category"})
    }
}
const historyStudent=async(req,res)=>{//expecting student details form req 
    try{
        const regNo_request = req.body.regNo
        const std = studentModel.findOne({regNo:regNo_request})
        if(!std)res.status(400).json({message:"stdent doesnt exists"})
        if(std.currYear === "1" && std.currTerm ==="Entry")
            res.json(400).json({})
        res.json(deriveHistory(std))
    }
    catch(error){
        res.status(404).send(false)
    }
}

const getStudents = async (req, res) => {
    try {
        console.log("Hello")
        const id = req.headers.id
        console.log(req.headers.id)
        const teacher = await teacherModel.findOne({ "teacherId": id })
        console.log(teacher)
        const students = []
        if (teacher) {
            for (let index = 0; index < teacher.classId.length; index++) {
                const classId = teacher.classId[index];
                const students_classId = await studentModel.find({ "classId": classId, "currYear" : {$ne : "passedOut"} })
                if(!students_classId.length == 0)
                students.push(students_classId)
            }
            if (students) {
                res.status(200).json({ students })
                console.log(students)
            }
            else {
                res.status(405).send(false)
            }
        }
        else {
            res.status(406).send(false)
        }
    }
    catch (error) {
        console.log(error)
        res.status(404).send(false)
    }

    // ----------------------IGNORE----------------------------
    //     const students = await studentModel.find({ "classId": { $in: teacher.classId } })

}

const getQuestions = async (req, res) => {
    try {
        const id = req.headers.id
        console.log(id)
        const student = await studentModel.findOne({ "regNo": id })
        if (student) {
            // console.log(student)
            res.json({ status: "success", data: student })
        }
        else {
            res.status(405).send(false)
        }
    }
    catch (error) {
        res.status(404).send(false)
    }
}

const getTeacher = async (req, res) => {
    try {
        const id = req.headers.id
        console.log(id)
        const teacher = await teacherModel.findOne({ "teacherId": id })
        if (teacher) {
            // console.log(student)
            res.json({ status: "success", data: teacher })
        }
        else {
            res.status(405).send(false)
        }
    }
    catch (error) {
        res.status(404).send(false)
    }
}

module.exports = {
    historyStudent,
    getStudents,
    evaluateStudent,
    getQuestions,
    getTeacher
}