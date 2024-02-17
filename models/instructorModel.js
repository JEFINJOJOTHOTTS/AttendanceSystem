import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const InsSchma = new mongoose.Schema(
    {
        insId: {
            type: String,
            required: true,
            default: uuidv4(),
        }, 
        attendance: [
            {
                in: {
                    type: Date,
                    required: true,
                },
                out: {
                    type: Date,
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

const Instructor = mongoose.model('instructor', InsSchma);

export { Instructor as insModel };
