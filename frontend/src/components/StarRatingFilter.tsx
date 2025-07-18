import type { ChangeEvent } from "react";

type Props = {
  selectedStars: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5 ">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label key={star} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span className="text-gray-600">{star} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
