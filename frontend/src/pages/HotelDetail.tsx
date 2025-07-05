import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const HotelDetail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelById"],
    queryFn: () => apiClient.fetchHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel?.starRating as number }).map(
            (_, index) => (
              <AiFillStar key={index} color="#BA8E23" />
            )
          )}
        </span>
        <h1 className="text-3xl font-bold">{hotel?.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel?.imageUrls.map((image, index) => (
          <div key={index} className="h-[300px]">
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel?.facilities.map((facility, index) => (
          <div
            key={index}
            className="border border-slate-300 rounded-sm p-3 text-gray-600"
          >
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line text-gray-600">
          {hotel?.description}
        </div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotel?.pricePerNight as number}
            hotelId={hotel?._id}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
