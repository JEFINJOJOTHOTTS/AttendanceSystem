const dateTimeValidation = (req, res, next) => {

    try {
        const dateTime = req.body.dateTime;

        const matches = dateTime.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);


        if (matches) {
            next()
        } else {
            res.send("invalid dateTime")
        }
    }
    catch (err) {

    }
}


module.exports = { dateTimeValidation }