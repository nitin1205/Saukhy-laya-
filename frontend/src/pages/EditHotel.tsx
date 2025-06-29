import { useNavigate, useParams } from "react-router-dom";

import * as apiClient from "../api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/appContext/useAppContext";

const EditHotel = () => {
  const { hotelId } = useParams();

  const { showToast } = useAppContext();

  const navigate = useNavigate();

  const { data: hotel } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateHotelById,
    onSuccess: () => {
      showToast({ message: "Hotel Updated Successfull!", type: "SUCCESS" });
      navigate("/my-hotels");
    },
    onError: () => {
      showToast({ message: "Error Updating Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isPending} />
  );
};

export default EditHotel;
