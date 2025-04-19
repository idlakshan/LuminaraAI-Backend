import express from "express"
import { createHotel, deleteHotel, getAllHotels, getHotelById, updateHotel } from "./../application/hotel";
import { isAuthenticated } from "./middleware/authentication-middleware";
import { isAdmin } from "./middleware/authorization-middleware";

const hotelsRouter=express.Router();

hotelsRouter.get("/",getAllHotels);
hotelsRouter.get("/:id",getHotelById);
hotelsRouter.post("/", isAuthenticated, isAdmin, createHotel);
hotelsRouter.put("/:id",updateHotel);
hotelsRouter.delete("/:id",deleteHotel);

export default hotelsRouter;