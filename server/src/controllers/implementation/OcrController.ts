import { NextFunction, Request, Response } from "express";
import { createWorker } from "tesseract.js";
import path from "path";
import { inject, injectable } from "tsyringe";
import { IOcrController } from "../interface/IOcrController";
import { IOcrService } from "../../service/interface/IOcrService";
import { MulterFiles } from "../../types/aadhaarData";
import {
  HttpResCode,
  HttpResMsg,
} from "../../constants/http-response.constants";
import CustomError from "../../errors/CustomError";
import { ROUTES } from "../../constants/Routes";

@injectable()
export default class OcrController implements IOcrController {
  private _ocrService: IOcrService;

  constructor(
    @inject("OcrService")
    ocrService: IOcrService
  ) {
    this._ocrService = ocrService;
  }

  async extractAadhaarDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const files = req.files as MulterFiles;

      if (!files || !files.aadhaarFront || !files.aadhaarBack) {
        return next(
          new CustomError(
            HttpResMsg.BOTH_IMAGES_NEEDED,
            HttpResCode.BAD_REQUEST
          )
        );
      }

      const aadhaarFrontPath = path.join(
        __dirname,
        ROUTES.UPLOAD,
        files.aadhaarFront[0].filename
      );

      const aadhaarBackPath = path.join(
        __dirname,
        ROUTES.UPLOAD,
        files.aadhaarBack[0].filename
      );

      const result = await this._ocrService.processAadhaar(
        aadhaarFrontPath,
        aadhaarBackPath
      );

      res.status(200).json({
        message: HttpResMsg.IMAGE_UPLOADED_SUCCESSFULLY,
        result,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        HttpResMsg.FAILED_TO_EXTRACT_DETAILS,
        HttpResCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}

