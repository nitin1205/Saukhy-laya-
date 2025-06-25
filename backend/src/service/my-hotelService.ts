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

export async function getMyHotelsService(userId: string) {
  try {
    // const hotels = await HotelModel.find({ userId }).populate("userId", "name");
    const hotels = await HotelModel.find({ userId });
    return hotels;
  } catch (error) {
    throw new Error(error);
  }
}
