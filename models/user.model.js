const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
        },
        role: {
            type: Number,
            default: 0,
        },
        male: {
            type: Number,
            default: 0,
        },
        avatar: {
            type: 'String',
            default:
                'https://res.cloudinary.com/thaovan/image/upload/v1604482967/mern-auth/avatar/male.jpg',
        },
        facebookId: {
            type: 'String',
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('User', userSchema, 'users')
