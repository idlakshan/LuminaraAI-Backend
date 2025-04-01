import "dotenv/config"
import express from "express";
import hotelsRouter from "./api/hotel.js";
import connectDB from "./infrastructure/db.js";
import usersRouter from "./api/user.js";
import bookingRouter from "./api/booking.js";

const app= express();
app.use(express.json());

connectDB();

app.use("/api/hotels",hotelsRouter)
app.use("/api/users",usersRouter)
app.use('/api/bookings', bookingRouter)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

