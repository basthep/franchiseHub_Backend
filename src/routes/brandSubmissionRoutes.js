const express = require("express");

const {
  createBrandSubmission,
  getBrandSubmissions,
  getBrandSubmission,
  updateBrandSubmission,
} = require("../controllers/brandSubmissionController");

const router = express.Router();

router.post("/", createBrandSubmission); 

module.exports = router;