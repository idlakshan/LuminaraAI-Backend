import "dotenv/config"
import express from "express";
import hotelsRouter from "./api/hotel.js";
import connectDB from "./infrastructure/db.js";

const app= express();
app.use(express.json());

connectDB();

app.use("/api/hotels",hotelsRouter)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

