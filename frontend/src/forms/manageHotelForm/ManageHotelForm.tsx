import { FormProvider, useForm } from "react-hook-form";

import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";
import type { HotelType } from "../../../../backend/src/shared/types";

export type TypeOfHotel =
  | "Budget"
  | "Boutique"
  | "Luxury"
  | "Ski Resort"
  | "Business"
  | "Family"
  | "Romantic"
  | "Hiking Resort"
  | "Cabin"
  | "Beach Resort"
  | "Golf Resort"
  | "Motel"
  | "All Inclusive"
  | "Pet Friendly"
  | "Self Catering";

export type HotelFacilities =
  | "Free WiFi"
  | "Parking"
  | "Airport Shuttle"
  | "Family Rooms"
  | "Non-Smoking Rooms"
  | "Outdoor Pool"
  | "Spa"
  | "Fitness Center";

export interface HotelFormData {
  name: string;
  city: string;
  country: string;
  description: string;
  type: TypeOfHotel;
  pricePerNight: number;
  starRating: number;
  facilities: HotelFacilities[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
  imageUrls: string[];
}

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (hotel) {
      reset({
        name: hotel.name,
        city: hotel.city,
        country: hotel.country,
        description: hotel.description,
        type: hotel.type as TypeOfHotel,
        pricePerNight: hotel.pricePerNight,
        starRating: hotel.starRating,
        facilities: hotel.facilities as HotelFacilities[],
        imageUrls: hotel.imageUrls,
        adultCount: hotel.adultCount,
        childCount: hotel.childCount,
      });
    } else {
      reset();
    }
  }, [hotel, reset]);

  const onSubmit = handleSubmit((hotelFormData: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", hotelFormData.name);
    formData.append("city", hotelFormData.city);
    formData.append("country", hotelFormData.country);
    formData.append("description", hotelFormData.description);
    formData.append("type", hotelFormData.type);
    formData.append("pricePerNight", hotelFormData.pricePerNight.toString());
    formData.append("starRating", hotelFormData.starRating.toString());
    formData.append("adultCount", hotelFormData.adultCount.toString());
    formData.append("childCount", hotelFormData.childCount.toString());

    hotelFormData.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (hotelFormData.imageUrls) {
      hotelFormData.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    if (hotelFormData.imageFiles) {
      Array.from(hotelFormData.imageFiles).forEach((imageFile) => {
        formData.append("imageFiles", imageFile);
      });
    }
    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 text-white p-2 font-bold hover:bg-purple-500 cursor-pointer text-2xl"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
