const instructorHelper = require('../helpers/instructorHelper');

//in - post
const inDateTime = async (req, res) => {
    try {
        const insId = "abcd";
        const ins = await instructorHelper.findInstructor(insId);
        if (ins) {
            if (ins.attendance[0].out) {
                const addedData = await instructorHelper.addInData(insId, req.body, 'in')
            } else {
                console.log("need to out")
            }
        } else {
            const addedData = await instructorHelper.addNewIns(insId, req.body)

        }
    } catch (err) {

    }
}

//out - post
const outDateTime = async (req, res) => {
    try {
        const insId = "abcd";
        const ins = await instructorHelper.findInstructor(insId);
        if (ins) {
            if (ins.attendance[0].in) {
                const addedData = await instructorHelper.addDataTime(insId, req.body, 'out')
            } else {
                console.log("need to In")
            }
        } else {
            console.log("need to In")

        }
    }
    catch (err) {

    }
}


module.exports = {
    inDateTime,
    outDateTime
}