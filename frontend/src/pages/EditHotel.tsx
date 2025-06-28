import { useParams } from "react-router-dom";

import * as apiClient from "../api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateHotelById,
    onSuccess: () => {},
    onError: () => {},
  });

  // console.log("response", data);

  // const hotel: HotelFormData = {
  //   name: data?.name as string,
  //   city: data?.city as string,
  //   country: data?.country as string,
  //   description: data?.description as string,
  //   type: data?.type as TypeOfHotel,
  //   pricePerNight: data?.pricePerNight as number,
  //   starRating: data?.starRating as number,
  //   facilities: data?.facilities as HotelFacilities[],
  //   imageFiles: data?.imageUrls as unknown as FileList,
  //   adultCount: data?.adultCount as number,
  //   childCount: data?.childCount as number,
  // };

  // console.log("hotel", hotel);

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isPending} />
  );
};

export default EditHotel;
