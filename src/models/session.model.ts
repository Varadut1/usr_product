import mongoose from 'mongoose';

import { userDocument } from './user.model';

export interface sessionDocument extends mongoose.Document{
    user: userDocument['_id'],
    valid: Boolean,
    createdAt: Date,
    updatedAt: Date,
    userAgent: String
}

const sessionSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        valid: {type: Boolean, default: true},
        userAgent: {type: String}
    }, 
    {
        timestamps: true,
    }
);

const Session = mongoose.model<userDocument>("Session", sessionSchema);

export default Session;