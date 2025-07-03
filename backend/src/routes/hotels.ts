import Router from "express";
import { searchHotelController } from "../controller/hotelController";
import { validateRequestQuery } from "../middlewares/validateResources";
import { SearchHotelQuerySchema } from "../schema/hotelSchema";

const router = Router();

router.get(
  "/search",
  validateRequestQuery(SearchHotelQuerySchema),
  searchHotelController
);

export default router;
