const { model } = require("mongoose")

const findPercent = (arr)=>{
    const count = 0
    const ans = 0
    for(let i=0;i<arr.length;i++){
        if(arr[i].answer == "yes"||arr[i].answer == "Yes")
            ans++
        if(arr[i].answer == "NA")
            continue
        count++
    }
    return ((ans/count) * 100)
}
const findPercentForRecreational = (arr)=>{
    const count_A = 0
    const count_B = 0
    const count_C = 0
    const count_D = 0
    const count_E = 0
    for(let i=0;arr.length;i++){
        if(arr[i].answer == "A") count_A++
        else if(arr[i].answer == "B") count_B++
        else if(arr[i].answer == "C") count_C++
        else if(arr[i].answer == "D") count_D++
        else if(arr[i].answer == "E") count_E++
    }
    const ans  = "Z"
    const score = 0
    const val =  Math.max(count_A,count_B,count_C,count_D,count_E)
    if(val === count_A)
        ans = "A"
    else if(val === count_B)
        ans = "B"
    else if(val === count_C)
        ans = "C"
    else if(val === count_D)
        ans = "D"
    else if(val === count_E)
        ans = "E"
    score = (val/arr.length)
    return {
        mode:ans,
        precet:score
    }
}

const deriveHistory = (std)=>{
    const ans = {}
    ans.reports = std.yearReport
    for(let i=0;i<ans.reports.length;i++){
        for(let j=0;i<ans.reports[i].termReport.length;j++){
            ans.reports[i].termReport[j].report.personalPercent = findPercent(ans.reports[i].termReport[j].report.personalQA)
            ans.reports[i].termReport[j].report.socialPercent = findPercent(ans.reports[i].termReport[j].report.socialQA)
            ans.reports[i].termReport[j].report.academicPercent = findPercent(ans.reports[i].termReport[j].report.academicQA)
            ans.reports[i].termReport[j].report.occupationalPercent = findPercent(ans.reports[i].termReport[j].report.occupationalQA)
            ans.reports[i].termReport[j].report.recreationalPercent = findPercentForRecreational(ans.reports[i].termReport[j].report.recreationalQA)
            delete ans.reports[i].termReport[j].report.personalQA
            delete ans.reports[i].termReport[j].report.socialQA
            delete ans.reports[i].termReport[j].report.academicQA
            delete ans.reports[i].termReport[j].report.occupationalQA
            delete ans.reports[i].termReport[j].report.recreationalQA
        }
    }
}

module.exports = deriveHistory