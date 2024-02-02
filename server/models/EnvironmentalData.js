import mongoose from "mongoose";

const EnvironmentalDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carbonFootprint: {
    type: Number,
    required: true,
  },
  energyConsumption: {
    type: Number,
    required: true,
  },
  wasteProduction: {
    type: Number,
    required: true,
  },
  transportationImpact: {
    type: Number,
    required: true,
  },
  recordedAt: {
    type: Date,
    default: Date.now,
  },
});

const EnvironmentalData = mongoose.model(
  "EnvironmentalData",
  EnvironmentalDataSchema
);

export default EnvironmentalData;
