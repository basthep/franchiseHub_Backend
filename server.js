const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const franchiseRoutes = require("./src/routes/franchiseRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const brandSubmissionRoutes = require("./src/routes/brandSubmissionRoutes");
const aiRoutes = require("./src/routes/aiRoutes"); 

const app = express();

const PORT = process.env.PORT || 5000;

// Database
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/images", express.static("public/images"));

// Test
app.get("/", (req, res) => {
  res.json({
    message: "Franchise API is running",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/franchises", franchiseRoutes);
app.use("/api/categories", categoryRoutes);
app.use( "/api/brand-submissions", brandSubmissionRoutes );
app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});
