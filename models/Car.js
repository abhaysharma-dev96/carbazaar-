import mongoose from "mongoose";

const currentYear = new Date().getFullYear();

const carSchema = new mongoose.Schema(
  {
    vehicleType: {
  type: String,
  required: true,
  enum: {
    values: ["car", "bike"],
    message: "{VALUE} is not a valid vehicle type",
  },
  default: "car",
},
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
      minlength: [2, "Brand must be at least 2 characters"],
    },

    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
      minlength: [1, "Model is required"],
    },
    year: {
      type: Number,
      required: [true, "Manufacturing year is required"],
      min: [1990, "Year must be 1990 or later"],
      max: [currentYear, `Year cannot be later than ${currentYear}`],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [10000, "Price must be at least ₹10,000"],
      max: [100000000, "Price cannot exceed ₹10 Crore"],
    },
    km: {
      type: Number,
      required: [true, "KM driven is required"],
      min: [0, "KM driven cannot be negative"],
      max: [500000, "KM driven cannot exceed 5,00,000"],
    },
    fuelType: {
      type: String,
      required: [true, "Fuel type is required"],
      enum: {
       values: [
  "Petrol",
  "Diesel",
  "CNG",
  "Electric",
  "Hybrid",
],
        message: "{VALUE} is not a valid fuel type",
      },
    },
    transmission: {
      type: String,
      required: [true, "Transmission is required"],
      enum: {
        values: ["Manual", "Automatic", "CVT"],
        message: "{VALUE} is not a valid transmission type",
      },
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      trim: true,
    },
    owners: {
      type: Number,
      required: [true, "Number of owners is required"],
      min: [1, "Owners must be at least 1"],
      max: [10, "Owners cannot exceed 10"],
    },
    regState: {
      type: String,
      required: [true, "Registration state is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [20, "Description should be at least 20 characters"],
    },
    images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length >= 3,
        message: "At least 3 photo is required",
      },
    },
category: {
  type: String,
  required: [true, "Category is required"],
  enum: {
    values: [
      "suv",
      "sedan",
      "hatchback",
      "sports-bike",
      "cruiser",
      "scooter",
      "commuter",
    ],
    message: "{VALUE} is not a valid category",
  },
},

featured: { 
  type: Boolean, 
  default: false 
},

owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},

},
{ 
  timestamps: true 
}
);

export default mongoose.model("Car", carSchema);