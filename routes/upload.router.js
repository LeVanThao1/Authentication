const router = require('express').Router()
const uploadImage = require('../helper/upload-image')
const auth = require('../middleware/auth')
const upload = require('../controllers/upload.controller')

router.post('/upload_avatar', uploadImage, auth, upload.uploadAvatar)

module.exports = router
