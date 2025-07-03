import { Request, RequestHandler, Response } from "express";

import logger from "../utils/logger";
import { findHotelsWithQueryLimitAndPageSize } from "../service/hotelService";
import { HotelSearchResponse } from "../shared/types";
import { SearchHotelInput } from "../schema/hotelSchema";

export const searchHotelController: RequestHandler = async (
  req: Request<{}, HotelSearchResponse, {}, SearchHotelInput>,
  res: Response
): Promise<void> => {
  try {
    const response = await findHotelsWithQueryLimitAndPageSize(req.query);

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
