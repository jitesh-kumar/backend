import express from "express";
import Calculation from "../models/Calculation.js";

const router = express.Router();

/**
 * POST /api/calculations/add
 * Add two numbers and save the result to database
 */
router.post("/add", async (req, res) => {
  try {
    const { number1, number2 } = req.body;

    // Validation
    if (number1 === undefined || number2 === undefined) {
      return res.status(400).json({
        success: false,
        message: "Both number1 and number2 are required",
      });
    }

    // Convert to numbers
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    // Check if valid numbers
    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({
        success: false,
        message: "Invalid numbers provided",
      });
    }

    // Calculate sum
    const sum = num1 + num2;

    // Save to database
    const calculation = new Calculation({
      number1: num1,
      number2: num2,
      sum: sum,
    });

    await calculation.save();

    res.status(201).json({
      success: true,
      message: "Calculation saved successfully",
      data: {
        id: calculation._id,
        number1: calculation.number1,
        number2: calculation.number2,
        sum: calculation.sum,
        createdAt: calculation.createdAt,
      },
    });
  } catch (error) {
    console.error("Error saving calculation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save calculation",
      error: error.message,
    });
  }
});

/**
 * GET /api/calculations
 * Get all calculations (most recent first)
 */
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const calculations = await Calculation.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: calculations.length,
      data: calculations,
    });
  } catch (error) {
    console.error("Error fetching calculations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch calculations",
      error: error.message,
    });
  }
});

/**
 * GET /api/calculations/:id
 * Get a specific calculation by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const calculation = await Calculation.findById(req.params.id);

    if (!calculation) {
      return res.status(404).json({
        success: false,
        message: "Calculation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: calculation,
    });
  } catch (error) {
    console.error("Error fetching calculation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch calculation",
      error: error.message,
    });
  }
});

/**
 * DELETE /api/calculations/:id
 * Delete a specific calculation
 */
router.delete("/:id", async (req, res) => {
  try {
    const calculation = await Calculation.findByIdAndDelete(req.params.id);

    if (!calculation) {
      return res.status(404).json({
        success: false,
        message: "Calculation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Calculation deleted successfully",
      data: calculation,
    });
  } catch (error) {
    console.error("Error deleting calculation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete calculation",
      error: error.message,
    });
  }
});

export default router;

