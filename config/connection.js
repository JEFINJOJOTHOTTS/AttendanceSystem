

const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const connect = async () => {
    await mongoose.connect(process.env.DATABASE_URL);

};

module.exports = { connect };
