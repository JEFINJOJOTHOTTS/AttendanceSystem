const instructorHelper = require('../helpers/instructorHelper');

//checkOverLap for both in and out attendance marking
async function checkOverlap(insId, inDateTime, outDateTime) {
    const outDateTimeUpdate = outDateTime ? outDateTime : inDateTime; //for inDateTime entry thr wont be outDateTime 
    const pageSize = 20; //no. of data limit in single page 
    const pageNum = 1;  //default page choosen

    //the active attendance entry on the day
    instructorHelper.getReport(insId, inDateTime, outDateTimeUpdate, pageSize, pageNum).then(() => {

        for (const date of report[0].attendance) {
            // checking each object of in and out date pair comparing with inDatetTime and outDateTime; outDateTime = inDateTime on attendance marking for In
            if ((outDateTimeUpdate >= date.in && outDateTimeUpdate <= date.out) || (inDateTime <= date.in && outDateTimeUpdate >= date.out)) {
                return false;
            }
        }
        return true;// no overlapping - return true

    }).catch(() => {
        res.status(500).json({ message: `db error; try again` })
    });

}

//in Attendance - post- method
const inDateTime = async (req, res) => {
    try {
        const insId = "abcde";
        const dateTime = new Date(req.body.dateTime);// string for to date format convertion

        //get last object of attendance array in instructor document
        const ins = await instructorHelper.findInstructor(insId);

        //does the document exist or a new instructor
        if (ins) {
            if (ins.attendance[0].out) {//the last object contain out time attendance or not
                if (await checkOverlap(insId, dateTime)) {// check overlaping of current inDateTime with and existing slotes

                    // database entry
                    instructorHelper.addInDataTime(insId, dateTime).then((data) => {
                        res.status(200).send(`success`)
                    }).catch(() => {
                        res.status(500).json({ message: `db error; try again` })
                    });

                } else {
                    //overlap
                    res.status(400).json({
                        message: 'cannot mark attendance',
                        reason: 'overlap'
                    });
                }
            } else {
                //out entry is not marked last attendance update
                res.status(400).json({
                    message: 'cannot mark attendance',
                    reason: 'need to mark "out" attendance'
                });
            }
        } else {
            // new Instructor creation 
            instructorHelper.addNewIns(insId, req.body).then((data) => {
                res.status(200).send(`success`)
            }).catch(() => {
                res.status(500).json({ message: `db error; try again` })
            });
        }
    } catch (err) {//error handling
        res.status(500).send(`${err}`);
    }
}

//outDateTime Attendance - method- post
const outDateTime = async (req, res) => {
    try {
        const insId = "abcde";
        const dateTime = new Date(req.body.dateTime);// string for to date format convertion

        //get last object of attendance array in instructor document
        const ins = await instructorHelper.findInstructor(insId);

        //instructor exist or the last object contain out time attendance or not 
        if (ins && ins.attendance[0].in && !ins.attendance[0].out) {
            if (ins.attendance[0].in < dateTime) {//check outDateTime is greater than inDAteTime
                if (await checkOverlap(insId, ins.attendance[0].in, dateTime)) {// check overlaping

                    // database entry
                    instructorHelper.addOutDataTime(insId, dateTime).then((data) => {
                        res.status(200).send(`success`)
                    }).catch(() => {
                        res.status(500).json({ message: `db error; try again` })
                    });

                } else {
                    //overlap
                    res.status(400).json({
                        message: 'cannot mark attendance',
                        reason: 'overlap'
                    });
                }
            } else {
                //out date is less than in date
                res.status(400).json({
                    message: 'cannot mark attendance',
                    reason: 'out time less than in time'
                });
            }
        } else {
            //in Attendance not marked
            res.status(400).json({
                message: 'cannot mark attendance',
                reason: 'need to mark "in" attendance'
            });
        }
    }
    catch (err) {//error handling
        res.status(500).send(err);

    }
}

const getReport = async (req, res) => {
    try {
        const insId = "abcde";
        const fromDate = new Date(req.body.fromDate);
        const toDate = new Date(req.body.toDate);
        const pageSize = 20;//no. of data limit in single page
        const pageNum = req.body.pageNo || 1;//pagination page number
        //fetch report from db
        instructorHelper.getReport(insId, fromDate, toDate, pageSize, pageNum).then((report) => {
            res.status(200).json(report);
        }).catch(() => {
            res.status(500).send('db error; try again');
        });


    } catch (err) {//error handling
        res.status(500).send(`${err}`);
    }
}

module.exports = {
    inDateTime,
    outDateTime,
    getReport,
    checkOverlap
}