import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import multer from "multer";
import path from "path";
import multerGoogleStorage from "multer-cloud-storage";

// if (process.env.NODE_ENV !== "production") {
//   throw new Error("僅適用於production");
// }

const keyPath = path.join(process.cwd(), "gcs-key-temp.json");

if (process.env.NODE_ENV === "production") {
  const credentials = process.env.GOOGLE_CLOUD_CREDENTIALS;

  if (!credentials) {
    throw new Error(
      "生產環境錯誤：GOOGLE_CLOUD_CREDENTIALS 環境變數未定義。請檢查部署配置。"
    );
  }

  fs.writeFileSync(keyPath, credentials);
}

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

    //keyFilename: path.resolve(process.env.KEY_FILE_PATH),
    keyFilename: process.env.NODE_ENV === "production" ? keyPath : undefined,

    bucket: process.env.BUCKET_NAME,
    destination: "products/",

    // filename: (req, file, cb) =>
    //   cb(null, `${Date.now()}_${path.extname(file.originalname)}`),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // e.g. ".jpg"
      const base = path.basename(file.originalname, ext); // e.g. "cat"
      cb(null, `${Date.now()}_${base}${ext}`);
    },
  }),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
