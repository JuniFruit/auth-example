import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import endpoints from "./routes/index";

import { handleException } from "./middleware/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", endpoints);
app.use(handleException);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!, {});
    app.listen(PORT, () => {
      console.log(`Server is online at: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
