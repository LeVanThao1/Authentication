const route = require('express').Router()
const userCtl = require('../controllers/user.controller')

route.post('/register', userCtl.register)
