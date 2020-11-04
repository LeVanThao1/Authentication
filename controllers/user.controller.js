const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('../helper/mailer')

const {
    CLIENT_URL,
    ACCESS_TOKEN,
    ACTIVATION_TOKEN,
    REFRESH_TOKEN,
} = process.env
const userCtl = {
    register: async (req, res, nex) => {
        try {
            const { email, password, name } = req.body

            if (!email || !password || !name) {
                return res.status(400).json({
                    msg: 'Please fill in all fields.',
                })
            }

            if (!validateEmail(email)) {
                return res.status(400).json({
                    msg: 'Invalid email.',
                })
            }

            const user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({
                    msg: 'This email already exists.',
                })
            }

            if (password.length < 8) {
                return res.status(400).json({
                    msg: 'Password must be at least 6 character.',
                })
            }
            const hashPassword = await bcrypt.hash(password, 12)

            const newUser = { email, name, password: hashPassword }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`

            sendMail(email, url, 'Verify your email address')

            res.status(201).json({
                msg: 'Register success! Please activate your email to start',
            })
        } catch (e) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

const createActivationToken = (payload) =>
    jwt.sign(payload, ACTIVATION_TOKEN, { expiresIn: '5m' })

const createAccessToken = (payload) =>
    jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '15m' })

const createRefreshToken = (payload) =>
    jwt.sign(payload, REFRESH_TOKEN, { expiresIn: '7d' })

module.exports = userCtl
