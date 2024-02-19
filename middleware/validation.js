const dateTimeValidation = (req, res, next) => {

    try {
        const dateTime = new Date(req.body.dateTime);

        const matchDateRex = req.body.dateTime.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
        const dateBan = (dateTime < new Date() && dateTime > new Date('2022-01-01T00:00')) ? true : false

        if (!matchDateRex) {
            res.status(400).send("invalid date format");
        } else if (!dateBan) {
            res.status(400).send("post date attendance cannot be marked")
        } else { next() }

    }
    catch (err) {

    }
}


const reportRequestValidation = (req, res, next) => {
    try {
        const fromDate = new Date(req.body.fromDate);
        const toDate = new Date(req.body.toDate);


        const dateRegx = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
        const matchFromDateRex = req.body.fromDate.match(dateRegx);
        const fromDateBan = (fromDate < new Date() && fromDate > new Date('2022-01-01T00:00')) ? true : false;
        const matchToDateRex = req.body.toDate.match(dateRegx);
        const toDateBan = (toDate < new Date() && toDate > new Date('2022-01-01T00:00')) ? true : false;
        if (!matchFromDateRex || !matchToDateRex) {
            res.status(400).send("invalid date format");
        } else if (!fromDateBan || !toDateBan) {
            res.status(400).send("post date report cannot be enter");
        } else { next(); }

    }
    catch (err) {

    }
}


module.exports = { dateTimeValidation, reportRequestValidation }