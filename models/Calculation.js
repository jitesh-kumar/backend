import mongoose from "mongoose";

const calculationSchema = new mongoose.Schema(
  {
    number1: {
      type: Number,
      required: true,
    },
    number2: {
      type: Number,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Calculation = mongoose.model("Calculation", calculationSchema);

export default Calculation;

