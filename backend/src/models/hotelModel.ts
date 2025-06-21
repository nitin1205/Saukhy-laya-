import { model, ObjectId, Schema } from "mongoose";

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

export type HotelDocument = Omit<HotelType, "_id" | "createdAt" | "updatedAt">;

const HotelSchema = new Schema<HotelType>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const HotelModel = model<HotelType>("Hotel", HotelSchema);

export default HotelModel;
