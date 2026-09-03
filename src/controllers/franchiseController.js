const Franchise = require("../models/Franchise");

// Get all franchises
const getFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find();

    res.status(200).json(franchises);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch franchises",
      error: error.message,
    });
  }
};

// Get single franchise by ID
const getFranchiseById = async (req, res) => {
  try {
    const franchise = await Franchise.findById(req.params.id);

    if (!franchise) {
      return res.status(404).json({
        message: "Franchise not found",
      });
    }

    res.status(200).json(franchise);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch franchise",
      error: error.message,
    });
  }
};

module.exports = {
  getFranchises,
  getFranchiseById,
}; 
