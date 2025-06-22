import { FormProvider, useForm } from "react-hook-form";

import DetailsSection from "./DetailsSection";

type HotelType =
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

type HotelFacilities =
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
  type: HotelType;
  pricePerNight: number;
  starRating: number;
  facilities: HotelFacilities[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
}

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();

  return (
    <FormProvider {...formMethods}>
      <form>
        <DetailsSection />
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
