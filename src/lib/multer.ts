import multer from "multer";
import uuid from "uuid";
import path from "path";


const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname))
    }
})

export default multer({ storage });