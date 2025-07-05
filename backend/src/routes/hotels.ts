import Router from "express";
import {
  getHotelByIdController,
  searchHotelController,
} from "../controller/hotelController";
import {
  validateRequestParams,
  validateRequestQuery,
} from "../middlewares/validateResources";
import {
  HotelIdParamsSchema,
  SearchHotelQuerySchema,
} from "../schema/hotelSchema";

const router = Router();

router.get(
  "/search",
  validateRequestQuery(SearchHotelQuerySchema),
  searchHotelController
);

router.get(
  "/:hotelId",
  validateRequestParams(HotelIdParamsSchema),
  getHotelByIdController
);

export default router;
