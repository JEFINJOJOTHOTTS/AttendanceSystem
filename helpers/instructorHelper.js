const Instructor = require('../models/instructorModel');

module.exports = {

    findInstructor: (insId) => {
        return new Promise(async (resolve, reject) => {
            const instructor = await Instructor.findOne({ insId: insId }, { attendance: { $slice: -1 } });
            resolve(instructor)
        })
    },

    addNewIns: (insId, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const instructor = new Instructor({
                    insId: insId,
                    attendance: [{
                        in: data.dateTime
                    }]
                });
                // console.log(instructor)
                resolve(await instructor.save());
            } catch (err) {
                reject();
            }

        })
    },

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

    getReport: (insId, fromDate, toDate, pageSize, pageNum) => {
        return new Promise(async (resolve, reject) => {
            try {
                const report = await Instructor.aggregate([
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
                    {
                        $unwind: "$attendance"
                    },
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

                    {
                        $project: {
                            insId: 1,
                            in: "$attendance.in",
                            out: "$attendance.out",
                            workingHours: {
                                $cond: {
                                    if: {
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
                                            if: { $lte: ["$attendance.in", fromDate] },
                                            then: { $subtract: ["$attendance.out", fromDate] },
                                            else: { $subtract: ["$attendance.out", "$attendance.in"] }
                                        }
                                    }
                                }
                            }
                        }
                    }, {
                        $sort: { in: 1 }
                    },
                    {
                        $group: {
                            _id: "$insId",
                            totalWorkingHours: { $sum: { $divide: ["$workingHours", 3600000] } },
                            attendance: { $push: { "in": "$in", "out": "$out", "workingHours": { $divide: ["$workingHours", 3600000] } } }
                        }
                    }
                    ,
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