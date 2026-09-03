const mongoose = require("mongoose");

const franchiseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    fullDescription: {
      type: String,
      default: "",
    },

    investment: {
      type: String,
      required: true,
    },

    roi: {
      type: String,
      default: "",
    },

    unitsOperating: {
      type: Number,
      default: 0,
    },

    yearFounded: {
      type: Number,
    },

    territories: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    support: {
      type: [String],
      default: [],
    },

    requirements: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Franchise", franchiseSchema);