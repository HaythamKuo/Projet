import multer from "multer";
import path from "path";
import multerGoogleStorage from "multer-cloud-storage";
import { Router } from "express";

const router = Router();

function fileFilter(req, file, cb) {
  const fileTypes = /jpe?g|png|webp/;
  const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimeTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("僅提供照片"), false);
  }
}

export const upload = multer({
  storage: multerGoogleStorage.storageEngine({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.KEY_FILE_PATH,
    bucket: process.env.BUCKET_NAME,
    destination: "products/",

    filename: (req, file, cb) =>
      cb(null, Date.now() + "_" + path.extname(file.originalname)),
  }),
  fileFilter,
});

router.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: err.message });
    res.json({ url: req.file.linkUrl });
  });
});

export default router;
