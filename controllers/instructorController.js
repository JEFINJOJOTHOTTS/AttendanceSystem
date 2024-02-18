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

const getReport = async (req, res) => {
    try {
        console.log("????????")
        const report = await instructorHelper.getReport();
        console.log(report)
        res.status(200).json(report);
        // res.status(500).json({ message: error.message });
        // res.status(404)
        //     .json({ message: `cannot find any product with ID ${id}` });


    } catch (err) {

    }
}

module.exports = {
    inDateTime,
    outDateTime,
    getReport
}