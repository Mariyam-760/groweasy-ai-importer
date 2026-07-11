import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import { parseCsv } from "../services/csv/parser.js";
import { mapHeaders } from "../services/ai/gemini.js";
import { mapRowsToCRM } from "../services/crm/mapper.js";

const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("========== IMPORT START ==========");

    if (!req.file) {
      console.log("No file uploaded");

      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("File received:", req.file.originalname);

    // Parse CSV
    const rows = await parseCsv(req.file.buffer);

    console.log("CSV parsed successfully");
    console.log("Total Rows:", rows.length);

    // Get CSV headers
    const headers = Object.keys(rows[0] || {});

    console.log("Headers:");
    console.log(headers);

    // Ask Gemini
    console.log("Calling Gemini...");

    const mappingText = await mapHeaders(headers);

    console.log("Gemini Response:");
    console.log(mappingText);

    // Convert Gemini response into JSON
    console.log("Parsing Gemini JSON...");

    const mapping = JSON.parse(mappingText);

    console.log("JSON parsed successfully");

    // Convert rows
    console.log("Converting rows...");

    const crmRows = mapRowsToCRM(rows, mapping);

    console.log("Rows converted:", crmRows.length);

    console.log("========== IMPORT SUCCESS ==========");

    return res.json({
      success: true,
      totalRows: rows.length,
      mapping,
      crmRows,
    });
  } catch (error) {
    console.log("========== IMPORT ERROR ==========");

    if (error instanceof Error) {
      console.log("Message:");
      console.log(error.message);

      console.log("Stack:");
      console.log(error.stack);
    } else {
      console.log(error);
    }

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unknown server error",
    });
  }
});

export default router;