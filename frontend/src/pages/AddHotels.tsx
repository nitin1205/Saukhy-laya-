import { useMutation } from "@tanstack/react-query";

import * as appClient from "../api-client";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/appContext/useAppContext";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: appClient.addHotel,
    onSuccess: () => {
      showToast({
        message: "Hotel added successfully",
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: "Error adding hotel",
        type: "ERROR",
      });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
};

export default AddHotel;
