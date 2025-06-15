import dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import path from "path";
import multerGoogleStorage from "multer-cloud-storage";

function fileFilter(req, file, cb) {
  const fileTypes = /jpe?g|png|webp/;
  const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimeTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("僅支援 jpeg / png / webp 圖片格式"), false);
  }
}

const upload = multer({
  storage: multerGoogleStorage.storageEngine({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.KEY_FILE_PATH,
    bucket: process.env.BUCKET_NAME,
    destination: "products/",
    filename: (req, file, cb) =>
      cb(null, `${Date.now()}_${path.extname(file.originalname)}`),
  }),
  fileFilter,
});

export default upload;
