const express = require("express");
const Franchise = require("../models/Franchise");

const router = express.Router();

// GET /api/categories
router.get("/", async (req, res) => { 
  try {
    const categories = await Franchise.aggregate([
      {
        $match: {
          category: { $exists: true, $ne: "" },
        },
      },
      {
        $group: {
          _id: "$category",
          brands: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.status(200).json(
      categories.map((category) => ({
        name: category._id,
        brands: category.brands,
      }))
    );
  } catch (error) {
    console.error("Category fetch error:", error);

    res.status(500).json({
      message: "Failed to fetch categories",
    });
  }
});

module.exports = router; 
