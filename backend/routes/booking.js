import express from "express"
import { getBookingbyuserId,createBooking,getBookings,deleteBooking } from "../controllers/BookingController.js"

const router = express.Router();

router.get("/",getBookings);

router.post("/getBookingbyuserId",getBookingbyuserId);
//create booking
router.post("/", createBooking);

router.delete("/:id",deleteBooking)

export default router;