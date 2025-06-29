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
    if (!hotels) {
      throw new Error("No Hotel Found");
    }
    return hotels;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getMyHotelByIdService(hotelId: string, userId: string) {
  try {
    const hotel = await HotelModel.findOne({
      _id: hotelId,
      userId,
    });
    if (!hotel) {
      throw new Error("Hotel Not Found");
    }
    return hotel;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateMyHotelByIdService(
  hotelId: string,
  updatedHotel: HotelDocument,
  userId: string
) {
  try {
    const hotel = await HotelModel.findOneAndUpdate(
      { _id: hotelId, userId },
      updatedHotel,
      { new: true }
    );
    if (!hotel) {
      throw new Error("Hotel Not Found");
    }

    await hotel.save();
    return hotel;
  } catch (error) {
    throw new Error(error);
  }
}
