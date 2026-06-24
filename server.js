import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import carRoutes from "./routes/carRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import contactRoutes from "./routes/contactRoutes.js";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 100, // har IP se max 100 requests per 15 min
  message: { success: false, message: "Too many requests, please try again later" },
});
app.use(limiter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
  res.send("CarBazaar API is running");
});

// Global error handler — sabse last mein hona chahiye
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});