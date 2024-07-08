const express = require('express')
const multer = require('multer')
const routes = express.Router()
const { registerStudent, registerTeacher, viewStudent, viewTeacher, downloadExcel, editTeacher } = require('../controllers/admin.controller')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

routes.put('/updateTeacher/:id', editTeacher)
routes.post('/registerStudent', registerStudent);
routes.post('/registerTeacher', upload.single('file'), registerTeacher);
routes.get('/viewStudent', viewStudent);
routes.get('/viewTeacher', viewTeacher);
routes.get('/download', downloadExcel);


module.exports = routes