import "reflect-metadata";
import { container } from "tsyringe";
import "../config/tsyringe.container"
import { Router } from "express";
// import uploadAadhaarImages from "../middlewares/multer.middleware";
import { IOcrController } from "../controllers/interface/IOcrController";
import upload from "../config/multer.config";

const router = Router();
const OcrController = container.resolve<IOcrController>("OcrController");

router.post(
  "/",
  upload.fields([
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
  ]),
  (req, res, next) => OcrController.extractAadhaarDetails(req, res, next)
);

export default router;
