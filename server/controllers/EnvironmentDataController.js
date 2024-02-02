// import User from "../models/User";
import EnvironmentalData from "../models/EnvironmentalData.js";

export const addEnvironmentData = async (req, res) => {
  try {
    const {
      userId,
      carbonFootprint,
      energyConsumption,
      wasteProduction,
      transportationImpact,
    } = req.body;

    // validating the correct owner of the environmental data

    if (req.user._id !== userId) {
      return res.status(403).json({
        msg: "You are not authorized to add environmental data for this user!",
      });
    }

    const newEnvironmentalData = new EnvironmentalData({
      user: userId,
      carbonFootprint,
      energyConsumption,
      wasteProduction,
      transportationImpact,
    });

    await newEnvironmentalData.save();

    return res.status(201).json({
      msg: "Environmental data added successfully!",
      data: newEnvironmentalData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
      msg: "An error occurred while adding environmental data!",
    });
  }
};

export const getEnvironmentalData = async (req, res) => {
  try {
    const userId = req.params.userId;

    // again validation of rightful owner of the environmental data
    if (req.user._id !== userId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to view this data!" });
    }

    const environmentalData = await EnvironmentalData.find({ user: userId });
    return res.status(200).json({ data: environmentalData });
  } catch (err) {}
};
