import Tesseract from "tesseract.js";
import { IOcrEngine } from "../interface/IOcrEngine";

export class TesseractEngine implements IOcrEngine {
  async recognize(imagePath: string): Promise<string> {
    try {
      const { data } = await Tesseract.recognize(imagePath, "eng");
      return data.text || "";
    } catch (error) {
      console.error("Tesseract OCR error:", error);
      return "";
    }
  }
}
