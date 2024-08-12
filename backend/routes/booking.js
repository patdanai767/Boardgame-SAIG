import express from "express"
import { getBookingbyuserId,createBooking,getBookings } from "../controllers/BookingController.js"

const router = express.Router();

router.get("/",getBookings);

router.post("/getBookingbyuserId",getBookingbyuserId);
//create booking
router.post("/", createBooking);

export default router;