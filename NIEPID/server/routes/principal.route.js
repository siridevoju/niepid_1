const express = require('express')
const routes = express.Router()
const { viewStudent, viewTeacher, getTeacher, searchStudent } = require('../controllers/principle.controller')


routes.get('/viewTeacher', viewTeacher);
routes.get('/view', viewStudent);
routes.get('/teacher/:classId', getTeacher)
routes.get('/student/search', searchStudent)

module.exports = routes