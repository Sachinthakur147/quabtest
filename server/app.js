// app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authenticate = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
    ],
    credentials: true,
  })
);
connectDB();

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", authenticate, productRoutes);
app.use("/api/cart", cartRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

module.exports = app;
