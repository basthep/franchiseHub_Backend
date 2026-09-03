const express = require("express");

const {
  getFranchises,
  getFranchiseById,
} = require("../controllers/franchiseController");

const router = express.Router();

// Get all franchises
router.get("/", getFranchises);

// Get single franchise
router.get("/:id", getFranchiseById);

module.exports = router; 
