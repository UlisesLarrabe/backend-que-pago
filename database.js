import mongoose from "mongoose";
import { MONGO_URL } from "./src/loadEnv.js";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });
