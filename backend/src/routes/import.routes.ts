import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Import API is working!",
  });
});

export default router;