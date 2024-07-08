const teacherModel = require('../models/teacher.model')
const studentModel = require('../models/student.model')

const viewTeacher = async (req, res) => {
    try {
        const teachers = await teacherModel.find({})
        console.log(teachers)
        if (teachers) {
            res.status(200).json({ status: "success", data: teachers })
        }
        else {
            res.status(405).json({ status: "success", data: [] })
        }
    }
    catch (error) {
        res.status(404).send(false)
    }
}

const getTeacher = async (req, res) => {
    const { classId } = req.params;

    try {
        const teacherDetails = await teacherModel.findOne({ classId }).populate('teacherId');
        if (!teacherDetails) {
            return res.status(404).json({ message: 'teacher not found' });
        }

        res.json({ teacher: teacherDetails.teacherName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const searchStudent = async (req, res) => {
    // try {
    const { regno, name, curryear, currterm, classid } = req.query;
    console.log(req.query)

    // Build the query object based on the provided filters
    const query = {};
    if (regno) query.regNo = new RegExp(regno, 'i');
    if (name) query.name = new RegExp(name, 'i');
    if (curryear) query.currYear = new RegExp(curryear, 'i');
    if (currterm) query.currTerm = new RegExp(currterm, 'i');
    if (classid) query.classId = new RegExp(classid, 'i');

    console.log(query)
    const students = await studentModel.find(query);
    res.json({ data: students });
    // } 

}

const viewStudent = async (req, res) => {
    try {
        console.log("---------")
        const students = await studentModel.find({});
        if (students.length) {
            res.status(200).json({ status: "success", data: students });
        } else {
            res.status(200).json({ status: "success", data: [] });
        }
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};
// const searchById = async (req, res) => {

// }

// const searchByName = async (req, res) => {

// }

// const searchByYear = async (req, res) => {

// }

// const searchBySection = async (req, res) => {

// }

// const searchByClassId = async (req, res) => {

// }

// const searchByAllottedTeacher = async (req, res) => {

// }
module.exports = { viewTeacher, viewStudent, getTeacher, searchStudent }

