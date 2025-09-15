import { HttpResCode, HttpResMsg } from "@constants/http-response.constants";
import { TYPES } from "@constants/tssyringe-types";
import CustomError from "@errors/CustomError";
import { IOcrEngine, IOcrService } from "@services/interface";
import extractAadhaarDetails from "@utils/extractAadhaarDetails";
import { FileManager } from "@utils/FileManager";
import { injectable, inject } from "tsyringe";
import { AadhaarDetails } from "types";


@injectable()
export class OcrService implements IOcrService {
  constructor(
    @inject(TYPES.OcrEngine) private _ocrEngine: IOcrEngine,
    @inject(FileManager) private _fileManager: FileManager
  ) {}

  async processAadhaar(frontPath: string, backPath: string): Promise<AadhaarDetails> {
    try {
      const [frontText, backText] = await Promise.all([
        this._ocrEngine.recognize(frontPath),
        this._ocrEngine.recognize(backPath),
      ]);

      const parsedData = extractAadhaarDetails(frontText, backText);

      if (!parsedData.isUIDsame) {
        throw new CustomError(HttpResMsg.UID_IS_NOT_SAME, HttpResCode.BAD_REQUEST);
      }

      return parsedData;
    } catch (error) {
      console.error(HttpResMsg.FAILED_TO_EXTRACT_DETAILS);
      if (error instanceof CustomError) throw error;
      throw new CustomError(HttpResMsg.FAILED_TO_EXTRACT_DETAILS, HttpResCode.INTERNAL_SERVER_ERROR);
    } finally {
      await this._fileManager.removeFiles([frontPath, backPath]);
    }
  }
}
