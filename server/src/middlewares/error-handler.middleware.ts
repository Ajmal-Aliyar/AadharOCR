import { HttpResCode, HttpResMsg } from "@constants/http-response.constants";
import { BaseError } from "@errors/BaseError";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
): void => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res
        .status(HttpResCode.BAD_REQUEST)
        .json({ message: HttpResMsg.IMAGE_SIZE_TOOLARGE });
    }
  }
  
  res.status(500).json({
    error: HttpResMsg.INTERNAL_SERVER_ERROR,
    message: err.message || HttpResMsg.SOMETHING_WENT_WRONG,
  });
};
