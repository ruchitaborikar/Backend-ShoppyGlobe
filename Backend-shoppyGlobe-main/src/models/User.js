import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema, 'Users');

export default User;
