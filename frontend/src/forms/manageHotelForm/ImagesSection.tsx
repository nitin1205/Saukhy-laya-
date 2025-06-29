import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");
  console.log("existingImageUrls", existingImageUrls);

  const handleDeleteImage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls?.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border-2 rounded p-4 flex-col gap-4 border-gray-300">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4 pb-3">
            {existingImageUrls.map((imageUrl, index) => (
              <div className="relative group" key={index}>
                <img
                  src={imageUrl}
                  className="min-h-full object-cover rounded-2xl"
                />
                <button
                  onClick={(event) => handleDeleteImage(event, imageUrl)}
                  className="absolute inset-0 flex items-center justify-center bg-black rounded-2xl group-hover:opacity-60 
                    opacity-0 transition-opacity duration-300 text-white font-bold p-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gary-700 font-normal file:cursor-pointer file:mr-4 file:py-2 file:px-4 
            file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 hover:file:bg-gray-300"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const filesArrayLength =
                (imageFiles ? imageFiles.length : 0) +
                (existingImageUrls?.length || 0);
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
