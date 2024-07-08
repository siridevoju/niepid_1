const findQAs = require('./deriveQAs')
const studentJsonGenerate = (data,v1)=>{
    const ans = {}
    ans.regNo = data.details.regNo
    ans.name = data.details.name
    ans.classId = v1
    ans.currYear=1
    ans.currTerm="Entry"
    ans.yearReport = [{
        year:1,
        yearComment:"not entered",
        termReport:[{
            term:"Entry",
            report:findQAs(data.stdCred.section),
            termComment:"not entered",
            personalComment:"not entered",
            occupationalComment:"not entered",
            recreationalComment:"not entered",
            academicComment:"not entered",
            socialComment:"not entered"
        }],
        yearPersonalComment:"not entered",
        yearOccupationalComment:"not entered",
        yearRecreationalComment:"not entered",
        yearAcademicComment:"not entered",
        yearSocialComment:"not entered"
    }]
    return ans
}
module.exports = studentJsonGenerate