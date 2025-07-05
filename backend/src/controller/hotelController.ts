import { Request, RequestHandler, Response } from "express";

import logger from "../utils/logger";
import {
  findHotelsWithQueryLimitAndPageSizeService,
  getHotelByIdService,
} from "../service/hotelService";
import { HotelSearchResponse } from "../shared/types";
import { HotelIdParamsType, SearchHotelInput } from "../schema/hotelSchema";

export const getHotelByIdController: RequestHandler = async (
  req: Request<HotelIdParamsType>,
  res: Response
) => {
  try {
    const hotelId = req.params.hotelId.toString();
    const hotel = await getHotelByIdService(hotelId);
    res.json(hotel);
    return;
  } catch (error) {
    logger.error("Error getting hotels", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
    return;
  }
};

export const searchHotelController: RequestHandler = async (
  req: Request<{}, HotelSearchResponse, {}, SearchHotelInput>,
  res: Response
): Promise<void> => {
  try {
    const response = await findHotelsWithQueryLimitAndPageSizeService(
      req.query
    );

    res.json(response);
    return;
  } catch (error) {
    logger.error("Error getting hotels:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
    return;
  }
};
