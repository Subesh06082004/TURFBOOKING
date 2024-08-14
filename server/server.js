import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // Keep this import
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import turfRouter from "./routes/turfRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import Turf from "./models/turf.js";
import Booking from "./models/booking.js";
import User from "./models/user.js";

// Load environment variables from .env file
const result = dotenv.config();

if (result.error) {
  console.error('Error loading .env file:', result.error);
}

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

console.log('MONGO_URL:', mongoUrl); // Debug log

if (!mongoUrl) {
  console.error('MONGO_URL is not defined in the environment variables');
  process.exit(1);
}

// Middleware setup
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes setup
app.use('/api/users', userRouter);
app.use('/api/turf', turfRouter);
app.use('/api/booking', bookingRouter);
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server only after successful connection to MongoDB
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    console.log(`${error.message} did not connect`);
  });