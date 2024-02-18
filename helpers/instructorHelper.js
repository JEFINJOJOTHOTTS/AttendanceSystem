const Instructor = require('../models/instructorModel');

module.exports = {

    //find last object on attendance array; purpose- does instructor exist, last update is in or out mark
    findInstructor: (insId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const instructor = await Instructor.findOne({ insId: insId }, { attendance: { $slice: -1 } });
                resolve(instructor);

            } catch (err) {
                reject();
            }
        })
    },

    //add new instructor and the in attendance mark
    addNewIns: (insId, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const instructor = new Instructor({
                    insId: insId,
                    attendance: [{
                        in: data.dateTime
                    }]
                });
                resolve(await instructor.save());
            } catch (err) {
                reject();
            }

        })
    },

    // add inDateTime attendance mark 
    addInDataTime: (insId, dateTime) => {
        return new Promise(async (resolve, reject) => {
            try {
                const instructor = await Instructor.findOneAndUpdate({
                    insId: insId
                },
                    {
                        $push:
                            { attendance: { in: dateTime } }
                    })
                resolve(instructor)
            } catch (err) {
                reject();
            }
        })
    },

    //add outDateTime to last object
    addOutDataTime: (insId, dateTime) => {
        return new Promise(async (resolve, reject) => {
            try {
                const instructor = await Instructor.findOne({ insId });
                const arrayPosition = instructor.attendance.length - 1;
                instructor.attendance[arrayPosition].out = dateTime;
                await instructor.save();
                resolve(instructor)
            } catch (err) {
                reject()
            }
        })
    },

    //get report on the from and todate
    getReport: (insId, fromDate, toDate, pageSize, pageNum) => {
        return new Promise(async (resolve, reject) => {
            try {
                const report = await Instructor.aggregate([
                    //choose the document
                    {
                        $match: {
                            "insId": insId,
                            $or: [
                                {
                                    $and: [
                                        { "attendance.in": { $gte: fromDate, $lte: toDate } },
                                        { "attendance.out": null }]
                                }, {
                                    $and: [
                                        { "attendance.in": { $lte: toDate } },
                                        { "attendance.out": { $gte: fromDate } }
                                    ]
                                }
                            ]


                        }
                    },
                    // array to seperate objects
                    {
                        $unwind: "$attendance"
                    },
                    //choose the matching documents unwinded
                    {
                        $match: {
                            $or: [
                                {
                                    $and: [
                                        { "attendance.in": { $gte: fromDate, $lte: toDate } },
                                        { "attendance.out": null }]
                                }, {
                                    $and: [
                                        { "attendance.in": { $lte: toDate } },
                                        { "attendance.out": { $gte: fromDate } }
                                    ]
                                }
                            ]
                        }
                    },
                    //project in, out, working hours
                    {
                        $project: {
                            insId: 1,
                            in: "$attendance.in",
                            out: "$attendance.out",
                            workingHours: {
                                $cond: {
                                    if: {
                                        /*out attendance dateTime is replaced by toDate if the out attendance is not marked 
                                        or out attendance is greater than toDate
                                        */
                                        $or: [
                                            { $eq: ["$attendance.out", null] },
                                            { $gte: ["$attendance.out", toDate] }
                                        ]
                                    },
                                    then: {
                                        $subtract: [toDate, "$attendance.in"]
                                    },
                                    else: {
                                        $cond: {
                                            if: {
                                                /*in attendance dateTime is replaced by fromDate if the in
                                                 attendance is greater than toDate
                                                */
                                                $lte: ["$attendance.in", fromDate]
                                            },
                                            then: { $subtract: ["$attendance.out", fromDate] },
                                            //normal condition where both in and out attendance mark are between the from and todate
                                            else: { $subtract: ["$attendance.out", "$attendance.in"] }
                                        }
                                    }
                                }
                            }
                        }
                    }, {
                        $sort: { in: 1 }// sorting 'in' attendance 
                    },
                    // convert object to array
                    {
                        $group: {
                            _id: "$insId",
                            totalWorkingHours: { $sum: { $divide: ["$workingHours", 3600000] } },//'/3600000 convert milliseconds to hour
                            attendance: { $push: { "in": "$in", "out": "$out", "workingHours": { $divide: ["$workingHours", 3600000] } } }
                        }
                    },
                    //pagination
                    {
                        $project: {
                            _id: 0,
                            totalWorkingHours: 1,
                            attendance: {
                                $slice: ["$attendance", (pageNum - 1) * pageSize, pageSize]
                            }
                        }
                    }
                ]);
                resolve(report)
            } catch (err) {
                reject()
            }
        })

    }

}