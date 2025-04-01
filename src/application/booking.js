import Booking from "../infrastructure/schemas/Booking.js";

export const createBooking=async(req,res)=>{
    const booking=req.body;

    if(!booking.hotelId || !booking.userId || !booking.checkIn || !booking.checkOut || !booking.roomNumber){
        return res.status(400).send();
    }

    await Booking.create({
        hotelId:booking.hotelId,
        userId:booking.userId,
        checkIn:booking.checkIn,
        checkOut:booking.checkOut,
        roomNumber: booking.roomNumber
    });

    return res.status(201).send();
}

export const getAllBookings=async(req,res)=>{
    const bookings = await Booking.find();
    return res.status(200).json(bookings);
}

export const getAllBookingsForHotel=async(req,res)=>{
    const hotelId=req.params.hotelId;

    const hotel= await Booking.find({hotelId}).populate("userId").populate("hotelId");

    if(!hotel){
        return res.status(404).send();
    }

    res.status(200).json(hotel);

}