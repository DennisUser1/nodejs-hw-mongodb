import mongoose from 'mongoose';
import { emailPatternUserModel } from '../../constants/authConstants.js';

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [emailPatternUserModel, 'Please, use a valid email address.'],
    },
    password: {
        type: String,
        required: true,
    },
},
{ timestamps: true, versionKey: false },
);

const UserCollection = mongoose.model('User', userSchema); // users
export default UserCollection;
