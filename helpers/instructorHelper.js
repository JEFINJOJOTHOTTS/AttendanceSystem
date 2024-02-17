const Instructor = require('../models/instructorModel');

module.exports = {

    findInstructor: (insId) => {
        return new Promise(async (resolve, reject) => {
            resolve(Instructor.find({ insId: insId }))
        })
    },

    addNewIns: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const ins = new Instructor({
                    insId: data.id,
                    attendance: [{
                        in: data.dateTime
                    }]
                });

                await ins.save();
            } catch (err) {

            }

        })
    },

    addInData: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Instructor.findOneAndUpdate({
                    insId: data.insId
                },
                    {
                        $push:
                            { attendance: { in: data.dateTime } }
                    })
            } catch (err) {

            }
        })
    }


}