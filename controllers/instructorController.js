const instructorHelper = require('../helpers/instructorHelper');


async function checkOverlap(insId, inDateTime, outDateTime) {
    const outDateTimeUpdate = outDateTime ? outDateTime : inDateTime;
    const pageSize = 20;
    const pageNum = 1;
    const report = await instructorHelper.getReport(insId, inDateTime, outDateTimeUpdate, pageSize, pageNum);
    console.log(report[0].attendance)
    for (const date of report[0].attendance) {
        if ((outDateTimeUpdate >= date.in && outDateTimeUpdate <= date.out) || (inDateTime <= date.in && outDateTimeUpdate >= date.out)) {
            console.log('false')
            return false;
        }
    }
    console.log('true')
        
    return true;

}

//in - post
const inDateTime = async (req, res) => {
    try {
        const insId = "abcde";
        const dateTime = new Date(req.body.dateTime);

        const ins = await instructorHelper.findInstructor(insId);
        if (ins) {
            if (ins.attendance[0].out) {
                if (await checkOverlap(insId, dateTime)) {
                    const addedData = await instructorHelper.addInDataTime(insId, dateTime)
                } else {
                    console.log("overlap")
                }
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
        const insId = "abcde";
        const dateTime = new Date(req.body.dateTime);
        const ins = await instructorHelper.findInstructor(insId);
        if (ins) {
            if (ins.attendance[0].in && !ins.attendance[0].out && ins.attendance[0].in<dateTime) {
                 if (await checkOverlap(insId,ins.attendance[0].in, dateTime) ) {

                    const addedData = await instructorHelper.addOutDataTime(insId, dateTime)

                } else {
                    console.log('overlap');
                }
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
        const insId = "abcde";
        const fromDate = new Date("2024-02-01T00:00:00.000Z");
        const toDate = new Date("2024-02-10T23:00:00.000Z");
        const pageSize = 20;
        const pageNum = 1;

        const report = await instructorHelper.getReport(insId, fromDate, toDate, pageSize, pageNum);
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
    getReport,
    checkOverlap
}