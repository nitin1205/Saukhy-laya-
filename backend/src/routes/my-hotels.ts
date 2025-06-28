import Router from "express";
import multer from "multer";

import verifyUser from "../middlewares/verifyUser";
import {
  createHotelHandler,
  getMyHotelByIdController,
  getMyHotelsController,
  updateHotelHandler,
} from "../controller/my-HotelsController";
import {
  validateRequestBody,
  validateRequestParams,
} from "../middlewares/validateResources";
import {
  CreateHotelSchema,
  HotelIdParams,
  UpdateHotelSchema,
} from "../schema/hotelSchema";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

const router = Router();

router.post(
  "/",
  verifyUser,
  upload.array("imageFiles", 6),
  validateRequestBody(CreateHotelSchema),
  createHotelHandler
);

router.get("/", verifyUser, getMyHotelsController);

router.get(
  "/:hotelId",
  verifyUser,
  validateRequestParams(HotelIdParams),
  getMyHotelByIdController
);

router.put(
  "/:hotelId",
  verifyUser,
  upload.array("imageFiles", 6),
  validateRequestParams(HotelIdParams),
  validateRequestBody(UpdateHotelSchema),
  updateHotelHandler
);

export default router;
