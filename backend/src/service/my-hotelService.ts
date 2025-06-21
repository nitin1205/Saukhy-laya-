import HotelModel, { HotelDocument } from "../models/hotelModel";

export async function createHotelService(input: HotelDocument) {
  try {
    const hotel = new HotelModel(input);
    await hotel.save();
    return hotel;
  } catch (error) {
    throw new Error(error);
  }
}
