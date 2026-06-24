import User from "../models/User.js";

// @desc  Add car to wishlist
// @route POST /api/wishlist/:carId
export const addToWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.wishlist.includes(req.params.carId)) {
      return res.status(400).json({ success: false, message: "Already in wishlist" });
    }
    user.wishlist.push(req.params.carId);
    await user.save();
    res.json({ success: true, message: "Added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    next(error);
  }
};

// @desc  Remove car from wishlist
// @route DELETE /api/wishlist/:carId
export const removeFromWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.carId
    );
    await user.save();
    res.json({ success: true, message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    next(error);
  }
};

// @desc  Get user wishlist
// @route GET /api/wishlist
export const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json({ success: true, data: user.wishlist });
  } catch (error) {
    next(error);
  }
};