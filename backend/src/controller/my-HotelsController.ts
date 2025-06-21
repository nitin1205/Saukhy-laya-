import { Request, RequestHandler, Response } from "express";
import cloudinary from "cloudinary";
import { ObjectId } from "mongoose";

import logger from "../utils/logger";
import HotelModel, { HotelDocument } from "../models/hotelModel";
import { CreateHotelInput } from "../schema/hotelSchema";
import { uploadImageToCloudinary } from "../utils/cloudinaryUtils";
import { createHotelService } from "../service/my-hotelService";

export const createHotelHandler: RequestHandler = async (
  req: Request<{}, {}, CreateHotelInput>,
  res: Response
) => {
  try {
    const imageUrls = await uploadImageToCloudinary(
      req.files as Express.Multer.File[]
    );

    const newHotel: HotelDocument = {
      ...req.body,
      imageUrls: imageUrls,
      userId: req?.userId as unknown as ObjectId,
    };

    const hotel = await createHotelService(newHotel);

    res.status(201).json({ hotel });
  } catch (error) {
    logger.error("Error ctreating hotel:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
    return;
  }
};
