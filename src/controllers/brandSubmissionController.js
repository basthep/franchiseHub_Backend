const BrandSubmission = require("../models/BrandSubmission");

// Submit brand
const createBrandSubmission = async (req, res) => {
  try {
    const submission = await BrandSubmission.create(req.body);

    res.status(201).json({
      message:
        "Your brand submission has been received. Our team will review your details and contact you soon.",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit brand",
      error: error.message,
    });
  }
}; 

module.exports = {
  createBrandSubmission, 
};