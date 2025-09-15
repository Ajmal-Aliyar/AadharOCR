import { HttpResCode, HttpResMsg } from "@constants/http-response.constants";
import { IOcrController } from "@controllers/interface";
import CustomError from "@errors/CustomError";
import { IOcrService } from "@services/interface";
import { MulterFiles } from "types";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { TYPES } from "@constants/tssyringe-types";

@injectable()
export default class OcrController implements IOcrController {
  constructor(@inject(TYPES.OcrService) private _ocrService: IOcrService) {}

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

      const aadhaarFrontUrl = this.getFileUrl(files.aadhaarFront[0]);
      const aadhaarBackUrl = this.getFileUrl(files.aadhaarBack[0]);

      const result = await this._ocrService.processAadhaar(
        aadhaarFrontUrl,
        aadhaarBackUrl
      );

      res.status(200).json({
        message: HttpResMsg.IMAGE_UPLOADED_SUCCESSFULLY,
        result,
      });
    } catch (error) {
      if (error instanceof CustomError) return next(error);
      next(
        new CustomError(
          HttpResMsg.FAILED_TO_EXTRACT_DETAILS,
          HttpResCode.INTERNAL_SERVER_ERROR
        )
      );
    }
  }

  private getFileUrl(file: Express.Multer.File): string {
    return (file as any).path;
  }
}
