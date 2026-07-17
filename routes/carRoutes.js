import express from "express";
import { getCars, getCarById, createCar, updateCar, deleteCar } from "../controllers/carController.js";
import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.array("images", 10),
  createCar
);

router.put(
  "/:id",
  protect,
  upload.array("images", 10),
  updateCar
);

router.delete(
  "/:id",
  protect,
  deleteCar
);
export default router;