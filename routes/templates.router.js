import express from "express";
import { getEmailLayout, renderAndDownloadTemplate, uploadEmailConfig, uploadImage } from "../controller/template.controller.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/getEmailLayout", getEmailLayout);
router.post("/uploadImage", upload.single("image"), uploadImage);
router.post("/uploadEmailConfig", uploadEmailConfig);
router.post("/renderAndDownloadTemplate", renderAndDownloadTemplate);

export default router;