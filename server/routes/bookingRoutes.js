import express from 'express';
import { checkAvailablityAPI, createBooking, getHotelBookings, getUserBookings, stripePayment } from '../controllers/bookingController.js';
import { protect } from "../middleware/authMiddleware.js";


const bookingRouter = express.Router();

bookingRouter.post('/check-availability',checkAvailablityAPI);
bookingRouter.post('/book',protect,createBooking )
bookingRouter.get('/user',protect,getUserBookings );
bookingRouter.get('/hotel-booking',protect,getHotelBookings );

bookingRouter.post('/stripe-payment', protect, stripePayment);

export default bookingRouter;