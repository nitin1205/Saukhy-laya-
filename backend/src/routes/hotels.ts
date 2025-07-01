import Router from "express";
import { searchHotelController } from "../controller/hotelController";

const router = Router();

router.get("/search", searchHotelController);

export default router;
