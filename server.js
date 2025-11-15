import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import calculationRoutes from "./routes/calculationRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/calculations";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "API is working!",
    endpoints: {
      health: "GET /",
      addCalculation: "POST /api/calculations/add",
      getCalculations: "GET /api/calculations",
      getCalculation: "GET /api/calculations/:id",
      deleteCalculation: "DELETE /api/calculations/:id",
    },
  });
});

app.use("/api/calculations", calculationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
