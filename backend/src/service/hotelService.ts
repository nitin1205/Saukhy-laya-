import HotelModel from "../models/hotelModel";

export async function findHotelsWithLimitAndPageSize(
  skip: number,
  pageSize: number
) {
  try {
    const hotels = await HotelModel.find().skip(skip).limit(pageSize);
    const totalHotels = await HotelModel.countDocuments();

    return {
      hotels,
      totalHotels,
    };
  } catch (error) {
    throw new Error(error);
  }
}
