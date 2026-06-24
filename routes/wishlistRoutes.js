import express from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getWishlist);
router.post("/:carId", protect, addToWishlist);
router.delete("/:carId", protect, removeFromWishlist);

export default router;