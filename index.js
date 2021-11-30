import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import enquiryRoutes from "./routes/enquiry.js";

dotenv.config();

const app = express();

app.use(compression());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/enquiry", enquiryRoutes);

const CONNECTION_URL =
  "mongodb+srv://manipalRentals:mkQmu6yBScBqDOFa@cluster0.gz5zj.mongodb.net/test?authSource=admin&replicaSet=atlas-uoe2d6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));
