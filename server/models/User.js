import {model, Schema} from 'mongoose';
import { isLowercase } from 'validator';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        }
    },
    password: {
        type: String,
        required: True,
        minlength: 6
    },
    DOB: {
        type: String,
        required: true
    },
    city: {
        type: String
    }
},
{
    timestamps: true
})

const User = model("User", userSchema);

export default User;