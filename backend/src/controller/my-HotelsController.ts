import { Request, RequestHandler, Response } from "express";
import { ObjectId } from "mongoose";

import logger from "../utils/logger";
import { HotelDocument } from "../models/hotelModel";
import {
  CreateHotelInput,
  HotelIdParamsType,
  UpdateHotelInput,
} from "../schema/hotelSchema";
import { uploadImageToCloudinary } from "../utils/cloudinaryUtils";
import {
  createHotelService,
  getMyHotelByIdService,
  getMyHotelsService,
  updateMyHotelByIdService,
} from "../service/my-hotelService";

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
    return;
  } catch (error) {
    logger.error("Error creating hotel:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
    return;
  }
};

export const getMyHotelsController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const hotels = await getMyHotelsService(req?.userId);
    res.json(hotels);
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

export const getMyHotelByIdController: RequestHandler = async (
  req: Request<HotelIdParamsType>,
  res: Response
) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await getMyHotelByIdService(hotelId, req?.userId);
    res.json(hotel);
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

export const updateHotelHandler: RequestHandler = async (
  req: Request<HotelIdParamsType, {}, UpdateHotelInput>,
  res: Response
) => {
  try {
    let imageUrls: string[] = [];
    if (req.files && req.files.length) {
      imageUrls = await uploadImageToCloudinary(
        req.files as Express.Multer.File[]
      );
    }

    const updatedHotel: HotelDocument = {
      ...req.body,
      imageUrls: [...(req.body.imageUrls || []), ...(imageUrls || [])],
      userId: req?.userId as unknown as ObjectId,
    };

    const hotel = await updateMyHotelByIdService(
      req.params.hotelId,
      updatedHotel,
      req.userId
    );
    res.status(201).json(hotel);
  } catch (error) {
    logger.error("Error updating hotel:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
};
