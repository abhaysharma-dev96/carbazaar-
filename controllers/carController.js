import Car from "../models/Car.js";
import { uploadToCloudinary } from "../middleware/upload.js";

// @desc  Get all cars with filters
// @route GET /api/cars
export const getCars = async (req, res, next) => {
  try {
    const { brand, fuelType, transmission, category, minPrice, maxPrice, q, featured ,  vehicleType,} = req.query;

    const filter = {};

    if (brand && brand !== "all") filter.brand = brand;
    if (fuelType && fuelType !== "all") filter.fuelType = fuelType;
    if (transmission && transmission !== "all") filter.transmission = transmission;
    if (category && category !== "all") filter.category = category;
    if (vehicleType && vehicleType !== "all")
  filter.vehicleType = vehicleType;
    if (featured) filter.featured = featured === "true";
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (q) {
      filter.$or = [
        { brand: { $regex: q, $options: "i" } },
        { model: { $regex: q, $options: "i" } },
      ];
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    next(error);
  }
};

// @desc  Get single car
// @route GET /api/cars/:id
export const getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    res.json({ success: true, data: car });
  } catch (error) {
    next(error);
  }
};

// @desc  Create new car listing with image upload
// @route POST /api/cars
export const createCar = async (req, res, next) => {
  try {
    const carData = {
      ...req.body,
     owner: req.user.id
    };

    // Upload images to Cloudinary
    if (req.files && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );

      carData.images = imageUrls;
    }

    const newCar = await Car.create(carData);

    res.status(201).json({
      success: true,
      data: newCar,
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete car
// @route DELETE /api/cars/:id
export const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    next(error);
  }
};
// @desc  Update car listing
// @route PUT /api/cars/:id
export const updateCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    const updateData = { ...req.body };

    // Existing images jo frontend se bachi hui bheji hain
    let finalImages = car.images;
    if (req.body.existingImages) {
      finalImages = JSON.parse(req.body.existingImages);
      delete updateData.existingImages;
    }

    // Nayi images upload karo aur existing ke saath combine karo
    if (req.files && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );
      finalImages = [...finalImages, ...imageUrls];
    }

    updateData.images = finalImages;

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: updatedCar });
  } catch (error) {
    next(error);
  }
};