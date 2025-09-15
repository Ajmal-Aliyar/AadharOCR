import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IOcrController } from "../interface/IOcrController";
import { IOcrService } from "../../service/interface/IOcrService";
import { MulterFiles } from "../../types/aadhaarData";
import {
  HttpResCode,
  HttpResMsg,
} from "../../constants/http-response.constants";
import CustomError from "../../errors/CustomError";


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


    const aadhaarFrontUrl = (files.aadhaarFront[0] as any).path;
    const aadhaarBackUrl = (files.aadhaarBack[0] as any).path;

    const result = await this._ocrService.processAadhaar(
      aadhaarFrontUrl,
      aadhaarBackUrl
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

