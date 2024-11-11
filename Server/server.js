import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth/auth-routes.js";
import adminPropertyRoutes from "./routes/admin/property-routes.js";
import shopPropertyRoutes from "./routes/shop/property-routes.js";

mongoose
  .connect(
    "mongodb+srv://shivanshpathak9988:legy1008@cluster0.e0tlv.mongodb.net/"
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: ["http://localhost:5173","https://stayease-234v.onrender.com","https://www.stayease-234v.onrender.com"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/property", adminPropertyRoutes);
app.use("/api/shop/property", shopPropertyRoutes);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
