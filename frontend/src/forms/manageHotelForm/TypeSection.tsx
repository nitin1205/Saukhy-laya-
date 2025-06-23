import { useFormContext } from "react-hook-form";

import { hotelTypes } from "../../config/hotel-options-config";
import type { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const selectedType = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={`cursor-pointer pl-[10%] rounded-full border-2 p-2 font-semibold ${
              selectedType === type
                ? "bg-purple-300 border-purple-500"
                : "bg-gray-300 border-gray-300"
            }`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
              className="mr-2 hidden"
            />
            <span className="text-gray-700 font-bold">{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
