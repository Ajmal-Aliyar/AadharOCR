import { TYPES } from "@constants/tssyringe-types";
import OcrController from "@controllers/implementation/OcrController";
import { IOcrController } from "@controllers/interface";
import { OcrService } from "@services/implementation/OcrService";
import { TesseractEngine } from "@services/implementation/TesseractService";
import { IOcrEngine, IOcrService } from "@services/interface";
import { FileManager } from "@utils/FileManager";
import "reflect-metadata";
import { container } from "tsyringe";


container.registerSingleton<IOcrEngine>(TYPES.OcrEngine, TesseractEngine);
container.registerSingleton(FileManager, FileManager);
container.registerSingleton<IOcrService>(TYPES.OcrService, OcrService);
container.registerSingleton<IOcrController>(TYPES.OcrController, OcrController);
