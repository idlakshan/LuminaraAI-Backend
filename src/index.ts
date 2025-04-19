import "dotenv/config"
import express from "express";
import cors from 'cors'
import hotelsRouter from "./api/hotel";
import connectDB from "./infrastructure/db";
import usersRouter from "./api/user";
import bookingRouter from "./api/booking";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import { clerkMiddleware } from "@clerk/express";

const app= express();

app.use(clerkMiddleware());

app.use(express.json({ limit: "25mb" }));
app.use(cors());

connectDB();

app.use("/api/hotels",hotelsRouter)
app.use("/api/users",usersRouter)
app.use('/api/bookings', bookingRouter)

app.use(globalErrorHandlingMiddleware)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

