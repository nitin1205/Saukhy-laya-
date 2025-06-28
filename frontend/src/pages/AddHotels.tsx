import { useMutation } from "@tanstack/react-query";

import * as appClient from "../api-client";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/appContext/useAppContext";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: appClient.addHotel,
    onSuccess: () => {
      showToast({
        message: "Hotel added successfully",
        type: "SUCCESS",
      });
      navigate("/my-hotels");
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
