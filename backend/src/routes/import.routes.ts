import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import { parseCsv } from "../services/csv/parser.js";

const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const rows = await parseCsv(req.file.buffer);

    res.json({
      success: true,
      totalRows: rows.length,
      rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to parse CSV",
    });
  }
});

export default router;