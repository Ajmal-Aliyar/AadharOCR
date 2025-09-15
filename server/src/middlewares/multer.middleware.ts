import upload from "@config/multer.config";


export const uploadAadhaarImages = upload.fields([
  {
    name: "aadhaarFront",
    maxCount: 1,
  },
  {
    name: "aadhaarBack",
    maxCount: 1,
  },
]);

