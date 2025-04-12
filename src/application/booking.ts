import { Request, Response, NextFunction } from "express";

import Booking from "../infrastructure/schemas/Booking";
import ValidationError from "../domain/errors/validation-error";

export const createBooking = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const booking = req.body;

    if (
      !booking.hotelId ||
      !booking.userId ||
      !booking.checkIn ||
      !booking.checkOut ||
      !booking.roomNumber
    ) {
        throw new ValidationError('Invalid booking data');
    }

    await Booking.create({
      hotelId: booking.hotelId,
      userId: booking.userId,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      roomNumber: booking.roomNumber,
    });

    res.status(201).send();
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllBookingsForHotel = async (req: Request,res: Response, next: NextFunction) => {
  try {
    const hotelId = req.params.hotelId;
    const bookings = await Booking.find({ hotelId: hotelId }).populate("userId");

    res.status(200).json(bookings);
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
    return;
  } catch (error) {
    next(error);
  }
};