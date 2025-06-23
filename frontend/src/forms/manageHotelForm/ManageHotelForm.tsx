import { FormProvider, useForm } from "react-hook-form";

import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";

export type HotelType =
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
  type: HotelType;
  pricePerNight: number;
  starRating: number;
  facilities: HotelFacilities[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
}

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>();

  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((data: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());

    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    // Append each image file
    Array.from(data.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    // Here you would typically send the formData to your API
    console.log("Form submitted with data:", Object.fromEntries(formData));
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
