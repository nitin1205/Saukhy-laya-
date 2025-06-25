import Router from "express";
import multer from "multer";

import verifyUser from "../middlewares/verifyUser";
import {
  createHotelHandler,
  getMyHotelController,
} from "../controller/my-HotelsController";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

const router = Router();

router.post("/", verifyUser, upload.array("imageFiles", 6), createHotelHandler);

router.get("/", verifyUser, getMyHotelController);

export default router;
