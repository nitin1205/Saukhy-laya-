import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border-2 rounded p-4 flex-col gap-4 border-gray-300">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gary-700 font-normal file:cursor-pointer file:mr-4 file:py-2 file:px-4 
            file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 hover:file:bg-gray-300"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const filesArrayLength = imageFiles.length;
              if (!filesArrayLength) {
                return "At least one image should be added";
              } else if (filesArrayLength > 6) {
                return "Maximum 6 images can be added";
              } else {
                return true;
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
