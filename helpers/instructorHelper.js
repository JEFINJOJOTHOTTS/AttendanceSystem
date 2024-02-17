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

            }

        })
    },

    addDataTime: (insId,data, api) => {
        return new Promise(async (resolve, reject) => {
            try {
                const instructor = await Instructor.findOneAndUpdate({
                    insId: insId
                },
                    {
                        $push:
                            { attendance: { api: data.dateTime } }
                    })
                resolve(instructor)
            } catch (err) {

            }
        })
    }


}