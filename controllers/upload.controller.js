const fs = require('fs')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const uploadCtl = {
    uploadAvatar: async (req, res, next) => {
        try {
            const file = req.files.file

            cloudinary.v2.uploader.upload(
                file.tempFilePath,
                {
                    folder: 'mern-auth/avatar',
                    width: 150,
                    height: 150,
                    crop: 'fill',
                },
                async (err, results) => {
                    if (err) throw err
                    removeTmp(file.tempFilePath)
                    res.status(200).json({
                        url: results.secure_url,
                    })
                },
            )
        } catch (e) {
            return res.status(500).json({ msg: e.messages })
        }
    },
}

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err
    })
}

module.exports = uploadCtl
