import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Countries from "./models/country.model.js";

const app = express();
const env = dotenv.config().parsed;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Database connection

app.get("/", async (req, res) => {
  await Countries.find()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log("Error in get", err));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log("Database not connected properly", err));

app.listen(process.env.PORT, () => {
  console.log(`App is listening on PORT ${process.env.PORT}`);
});
