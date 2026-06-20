import express from "express";
import { getCars, getCarById, createCar, updateCar, deleteCar } from "../controllers/carController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", upload.array("images", 10), createCar);
router.put("/:id", upload.array("images", 10), updateCar);
router.delete("/:id", deleteCar);

export default router;