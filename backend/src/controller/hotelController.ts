import { Request, RequestHandler, Response } from "express";

import logger from "../utils/logger";
import { findHotelsWithLimitAndPageSize } from "../service/hotelService";
import { HotelSearchResponse } from "../shared/types";

export const searchHotelController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );

    const skip = (pageNumber - 1) * pageSize;

    const hotels = await findHotelsWithLimitAndPageSize(skip, pageSize);

    const response: HotelSearchResponse = {
      data: hotels.hotels,
      pagination: {
        total: hotels.totalHotels,
        page: pageNumber,
        pages: Math.ceil(hotels.totalHotels / pageSize),
      },
    };
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
