const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {

    // exrtract tokem from header
    const bearerToken = req.headers.authorization
    // extract token only 
    const token = bearerToken.split(' ')[1]

    if (token === undefined) return res.status(401).send("No token found")

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.insId = payload.insId
        next()
    } catch (err) {
        console.log(err);
        return res.status(401).send("Unauthorized")
    }

}

module.exports = { verify }