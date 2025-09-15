import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import "@config/tsyringe.container";
import cors from "cors";
import express from "express";
import aadhaarRoutes from "@routes/aadhaarRoutes";
import CustomError from "@errors/CustomError";
import { HttpResCode, HttpResMsg } from "@constants/http-response.constants";
import { errorHandler } from "@middlewares/error-handler.middleware";
import { env } from "@config/env.config";

const app = express();
const PORT = env.PORT;

app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

app.use("/api/parse-aadhaar", aadhaarRoutes);

app.use((_req, _res, next) => {
  next(new CustomError(HttpResMsg.ROUTE_NOT_FOUND, HttpResCode.NOT_FOUND));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(HttpResMsg.SERVER_CONNECTION);
});
