import express from "express"
import { createHotel, deleteHotel, getAllHotels, getHotelById, updateHotel } from "./../application/hotel";

const hotelsRouter=express.Router();

hotelsRouter.get("/",getAllHotels);
hotelsRouter.get("/:id",getHotelById);
hotelsRouter.post("/",createHotel);
hotelsRouter.put("/:id",updateHotel);
hotelsRouter.delete("/:id",deleteHotel);

export default hotelsRouter;