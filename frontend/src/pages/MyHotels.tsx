import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/appContext/useAppContext";
import type { HotelType } from "../../../backend/src/shared/types";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData, error } = useQuery({
    queryKey: ["fetchHotels"],
    queryFn: apiClient.fetchMyHotels,
  });

  if (error) {
    showToast({
      message: "Failed to fetch hotels",
      type: "ERROR",
    });
  }

  if (!hotelData) {
    return (
      <span className="text-red-500 text-xl font-bold">No Hotel Found.</span>
    );
  }

  return (
    <div className="space-y-4">
      <span className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-purple-600 text-white text-xl font-bold hover:bg-purple-500 items-center 
            justify-center px-4 py-2 rounded-md transition duration-300"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel: HotelType, index: number) => (
          <div
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            key={index}
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <div className="mr-1">
                  <BsMap />
                </div>
                {hotel.city}, {hotel.country}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <div className="mr-1">
                  <BsBuilding />
                </div>
                {hotel.type}
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <div className="mr-1">
                  <BiMoney />
                </div>
                ₹{hotel.pricePerNight} per night
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <div className="mr-1">
                  <BiHotel />
                </div>
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <div className="mr-1">
                  <BiStar />
                </div>
                {hotel.starRating} {hotel.starRating === 1 ? "star" : "stars"}
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-purple-600 text-white text-xl font-bold hover:bg-purple-500 items-center 
                    justify-center px-4 py-2 rounded-md transition duration-300"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
