import mongoose from 'mongoose';
import { User } from './user.model';

export const Session = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: () => User
    },
    valid: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const SessionModel = mongoose.model('Session',Session);

export default SessionModel;