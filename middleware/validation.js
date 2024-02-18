const dateTimeValidation = (req, res, next) => {

    try {
        const dateTime = new Date(req.body.dateTime);

        const matchDateRex = req.body.dateTime.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
        const dateBan = (dateTime<new Date()&&dateTime>new Date('2022-01-01T00:00'))?true:false

        if (matchDateRex&&dateBan) {
            next()
        } else {
            res.send("invalid dateTime or advance date entry")
        }
    }
    catch (err) {

    }
}


module.exports = { dateTimeValidation }