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
                console.log('pppppppppppppp')
                const instructor = new Instructor({
                    insId: insId,
                    attendance: [{
                        in: data.dateTime
                    }]
                });
                // console.log(instructor)
                resolve(await instructor.save());
            } catch (err) {

            }

        })
    },

    addInData: (insId,data) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("ffffffffffff")
                const instructor = await Instructor.findOneAndUpdate({
                    insId: insId
                },
                    {
                        $push:
                            { attendance: { in: data.dateTime } }
                    })
                resolve(instructor)
            } catch (err) {

            }
        })
    }


}