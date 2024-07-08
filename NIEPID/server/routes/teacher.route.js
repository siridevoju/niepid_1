const express=require('express')
const routes=express.Router()
const { historyStudent,evaluateStudent,getStudents,getQuestions,getTeacher } = require('../controllers/teacher.controller')

routes.get('/history/:id',historyStudent)
routes.get('/getStudents',getStudents)
routes.post('/evaluate/:types',evaluateStudent)
routes.get('/evaluate/getQuestions',getQuestions)
routes.get('/getTeacher',getTeacher)

module.exports=routes