const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        callback(null,true)
    }
    else{
        callback(null,false)
        return(callback(new Error('ONLY png,jpg,jpeg files are accepted')))
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig