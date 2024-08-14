import BookingModel from "../models/bookingModel.js";

export const getBookingbyuserId = async(req,res,next) => {
    try {
        const userid = req.body.userid;
        const getbooking = await BookingModel.find({userId:userid});
        res.send(getbooking);
    } catch (err) {
        next(err);
    }
}

export const createBooking = async(req,res,next) => {
    try {
        const booking = new BookingModel(req.body);
        const saveBooking = await booking.save();
        res.status(200).json({message: "success", saveBooking});
    } catch (err) {
        next(err);
    }
}

export const getBookings = async(req,res,next) => {
    try {
        const showBookings = await BookingModel.find();
        res.status(200).json(showBookings);        
    } catch (err) {
        next(err)
    }
}

export const deleteBooking = async (req, res, next) => {
    try {
        await BookingModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Table has been deleted.")
    } catch (err) {
        next(err);
    }
}