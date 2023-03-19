import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import endpoints from "./routes/index";
import products from "./routes/products";
import path from "path";
import { handleException } from "./middleware/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const clientPath =
  process.env.NODE_ENV === "production"
    ? "../../../../client/dist"
    : "../../client/dist";

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, clientPath)));
app.use("/api", endpoints);
app.use("/data", products);
app.use(handleException);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, clientPath, "index.html"));
});

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
