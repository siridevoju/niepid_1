const mongoose = require('mongoose');

const StudentReport = new mongoose.Schema({
    regNo: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required:true
    },
    currYear:{//current year added
        type:String,
        required:true ,
        enum:["1","2","3","passedOut"]
    },
    currTerm:{//Not required can be exculed
        type:String,
        requirde:true,
        enum:["Entry","I","II","III"]
    },
    classId: {
        type: String,
        required: true
    },
    yearReport: [{
        year: {
            type: Number,
            required: true,
            enum:["1","2","3"]
        },
        yearComment: {
            type: String,
            required: true
        },
        termReport: [{
            term: {
                type: Number,
                required: true,
                enum:["Entry","I","II","III"]
            },
            report: {
                personalQA: [{
                    question: String,
                    answer: String
                }],
                socialQA: [{
                    question: String,
                    answer: String
                }],
                academicQA: [{
                    question: String,
                    answer: String
                }],
                occupationalQA: [{
                    question: String,
                    answer: String
                }],
                recreationalQA: [{
                    question: String,
                    answer: String
                }],
            },

            termComment: {
                type: String
            },
            personalComment: {
                type: String
            },
            occupationalComment: {
                type: String
            },
            recreationalComment: {
                type: String
            },
            academicComment: {
                type: String
            },
            socialComment: {
                type: String
            }
        }]
        ,
        yearPersonalComment: {
            type: String
        },
        yearOccupationalComment: {
            type: String
        },
        yearRecreationalComment: {
            type: String
        },
        yearAcademicComment: {
            type: String
        },
        yearSocialComment: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Student', StudentReport);