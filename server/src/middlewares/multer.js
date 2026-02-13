import multer from "multer";

const storage = multer.diskStorage({
    destination: "public/images",
    filename: (_, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith("image/")){
        return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 5MB limit
});

export default upload;