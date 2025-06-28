export type HotelType = {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
};
