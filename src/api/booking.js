import express from 'express'
import { createBooking, getAllBookings, getAllBookingsForHotel } from '../application/booking.js';
const bookingRouter=express.Router();

bookingRouter.get('/', getAllBookings);
bookingRouter.post('/',createBooking);
bookingRouter.get('/hotels/:hotelId',getAllBookingsForHotel)


export default bookingRouter;