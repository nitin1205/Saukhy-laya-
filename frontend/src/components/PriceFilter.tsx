type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        className="border-2 border-gray-5400 p-2"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].map(
          (price) => (
            <option value={price}>{price}</option>
          )
        )}
      </select>
    </div>
  );
};

export default PriceFilter;
