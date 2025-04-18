import { NextFunction, Request, Response } from "express";

import { v2 as cloudinary } from 'cloudinary';
import Hotel from "../infrastructure/schemas/Hotel";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


export const getAllHotels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const hotels = await Hotel.find();
    res.status(200).json(hotels);
    return;
  } catch (error) {
    next(error);
  }
};


export const getHotelById = async (req: Request,res: Response,next: NextFunction) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    res.status(200).json(hotel);
    return;
  } catch (error) {
    next(error);
  }
};

export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, location, image, price, description } = req.body;

    if (!image) {
      throw new ValidationError("Hotel image is required");
    }

    if (!name || !location || !price || !description) {
      throw new ValidationError("Invalid hotel data");
    }

    // Upload image (base64) to cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "hotels",
      resource_type: "auto",
    });

    const newHotel = new Hotel({
      name,
      location,
      image: result.secure_url,
      price: parseFloat(price),
      description,
    });

    await newHotel.save();

    res.status(201).send(newHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const hotelId = req.params.id;
    await Hotel.findByIdAndDelete(hotelId);

    res.status(200).send();
    return;
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const hotelId = req.params.hotelId;
    const updatedHotel = req.body;

    if (
      !updatedHotel.name ||
      !updatedHotel.location ||
      !updatedHotel.rating ||
      !updatedHotel.reviews ||
      !updatedHotel.image ||
      !updatedHotel.price ||
      !updatedHotel.description
    ) {
      throw new ValidationError("Invalid hotel data");
    }

    await Hotel.findByIdAndUpdate(hotelId, updatedHotel);

    res.status(200).send();
    return;
  } catch (error) {
    next(error);
  }
};