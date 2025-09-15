import { TYPES } from "@constants/tssyringe-types";
import { IOcrController } from "@controllers/interface";
import {asyncHandler, uploadAadhaarImages} from "@middlewares/index";
import { Router } from "express";
import { container } from "tsyringe";


const router = Router();

const OcrController = container.resolve<IOcrController>(TYPES.OcrController);

router.post("/", uploadAadhaarImages, asyncHandler(OcrController.extractAadhaarDetails.bind(OcrController)));

export default router;
