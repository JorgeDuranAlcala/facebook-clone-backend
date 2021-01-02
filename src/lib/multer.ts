import multer from "multer";
import uniqid from "uniqid";
import path from "path";


const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uniqid('', `.${path.extname(file.originalname)}`) )
    }
})

export default multer({ storage });