import express from "express";
import {
  createBooking,
  checkAvailability,
  bookingById,
  onSuccessFullPayment,
  getBookingById,
  createCheckoutSession,
  checkAvailabilityById,
  onCancelPayment,
  getUserBookingById
} from "../controllers/bookingController.js";
import Auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a booking
router.post("/create", Auth, createBooking);

// Route to check availability
router.post("/checkAvailability", checkAvailability);

router.post("/createPaymentSession", Auth, createCheckoutSession);

// Route to get bookings by turfId (
router.post("/getBookings/:turfId", bookingById);
router.get("/getBookings/user/:userId", getUserBookingById);

router.put("/payment/success/:bookingId", Auth, onSuccessFullPayment);
router.delete("/delete/:bookingId", Auth, onCancelPayment);

// Route to get a specific booking by ID
router.get("/:turfId", getBookingById);

// Route to get blocked dates by turfId
router.get("/getBlockedDates/:turfId", checkAvailabilityById);

export default router;
