import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      const uploadDir = "../uploads";
      cb(null, uploadDir);
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
   },
});

export const upload = multer({ storage });
