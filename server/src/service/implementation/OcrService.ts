import { HttpResCode, HttpResMsg } from "../../constants/http-response.constants";
import CustomError from "../../errors/CustomError";
import fs from "fs/promises";
import { IOcrService } from "../interface/IOcrService";
import extractAadhaarDetails from "../../utils/extractAadhaarDetails";
import { AadhaarDetails } from "../../types/aadhaarData";
import Tesseract from "tesseract.js";

export default class OcrService implements IOcrService {
  async processAadhaar(
    frontPath: string,
    backPath: string
  ): Promise<AadhaarDetails> {
    try {
      const [frontText, backText] = await Promise.all([
        this.extractTextUsingTesseract(frontPath),
        this.extractTextUsingTesseract(backPath),
      ]);

      const parsedData = extractAadhaarDetails(frontText, backText);

      if (!parsedData.isUIDsame) {
        throw new CustomError(
          HttpResMsg.UID_IS_NOT_SAME,
          HttpResCode.BAD_REQUEST
        );
      }

      return parsedData;
    } catch (error) {
      console.error(HttpResMsg.FAILED_TO_EXTRACT_DETAILS);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        HttpResMsg.FAILED_TO_EXTRACT_DETAILS,
        HttpResCode.INTERNAL_SERVER_ERROR
      );
    } finally {
      try {
        await Promise.all([fs.unlink(frontPath), fs.unlink(backPath)]);
      } catch (err) {
        console.warn(HttpResMsg.FAILED_TO_REMOVE_FILES, err);
      }
    }
  }

  async extractTextUsingTesseract(imagePath: string): Promise<string> {
    try {
      const { data } = await Tesseract.recognize(imagePath, "eng");
      return data.text || "";
    } catch (error) {
      console.error("Tesseract OCR error:", error);
      return "";
    }
  }
}
