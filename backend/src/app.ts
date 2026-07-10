import express from "express";
import cors from "cors";

import importRoutes from "./routes/import.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GrowEasy Backend Running 🚀",
  });
});

app.use("/api/import", importRoutes);

export default app;