const mongoose = require('mongoose');
// import { v4 as uuidv4 } from 'uuid';

const InsSchma = new mongoose.Schema(
    {
        insId: {
            type: String,
            required: true,
        },
        attendance: [
            {
                _id: false,
                in: {
                    type: String,
                    required: true,
                },
                out: {
                    type: String,
                    required: false,
                },
            },
        ],
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret._id;
                delete ret.__v;
            },
        },
    },
);

module.exports =new mongoose.model('Instructor', InsSchma);
