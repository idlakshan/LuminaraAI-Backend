import "dotenv/config"
import express from "express";
import cors from 'cors'
import hotelsRouter from "./api/hotel";
import connectDB from "./infrastructure/db";
import usersRouter from "./api/user";
import bookingRouter from "./api/booking";

const app= express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/hotels",hotelsRouter)
app.use("/api/users",usersRouter)
app.use('/api/bookings', bookingRouter)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

