import { useFormContext } from "react-hook-form";

import type { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            className="border-2 rounded w-full py-2 px-3 font-normal bg-white border-gray-400"
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
        </label>
        {errors.adultCount && (
          <span className="text-red-500 text-sm font-bold pt-7">
            {errors.adultCount.message}
          </span>
        )}

        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            className="border-2 rounded w-full py-2 px-3 font-normal bg-white border-gray-400"
            type="number"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
        </label>
        {errors.childCount && (
          <span className="text-red-500 text-sm font-bold pt-7">
            {errors.childCount.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default GuestSection;
