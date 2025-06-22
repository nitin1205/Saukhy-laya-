import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const HotelDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Add Hotel</h1>

      <label htmlFor="name" className="text-gray-700 font-bold flex-1">
        Name
        <input
          type="text"
          id="name"
          className="border-2 rounded w-full py-1 px-2 font-normal border-gray-400"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label htmlFor="city" className="text-gray-700 font-bold flex-1">
          City
          <input
            type="text"
            id="city"
            className="border-2 rounded w-full py-1 px-2 font-normal border-gray-400"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>

        <label htmlFor="country" className="text-gray-700 font-bold flex-1">
          Country
          <input
            type="text"
            id="country"
            className="border-2 rounded w-full py-1 px-2 font-normal border-gray-400"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label htmlFor="description" className="text-gray-700 font-bold flex-1">
        Description
        <textarea
          rows={10}
          id="description"
          className="border-2 rounded w-full py-1 px-2 font-normal border-gray-400"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      <label
        htmlFor="pricePerNight"
        className="text-gray-700 font-bold flex-1 max-w-[50%]"
      >
        price Per Night
        <input
          type="number"
          min={1}
          id="pricePerNight"
          className="border-2 rounded w-full py-1 px-2 font-normal border-gray-400"
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>

      <label
        htmlFor="starRating"
        className="text-gray-700 font-bold flex-1 max-w-[50%]"
      >
        <select
          {...register("starRating", { required: "This field is required" })}
          id="starRating"
          className="border-2 border-gray-400 rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating} className="text-sm font-bold">
              {rating} Star{rating > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default HotelDetailsSection;
