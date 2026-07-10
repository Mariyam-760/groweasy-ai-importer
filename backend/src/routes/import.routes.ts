import { Router } from "express";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.post("/", upload.single("file"), (req, res) => {
    console.log("📄 File received:", req.file?.originalname);
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  res.json({
    success: true,
    filename: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

export default router;