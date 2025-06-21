import z from "zod/v4";

export const createHotelSchema = z.object({
  name: z.string({
    error: (iss) =>
      iss.input === undefined
        ? "Hotel name is required."
        : "Invalid Hotel name.",
  }),
  city: z.string({
    error: (iss) =>
      iss.input === undefined ? "City is required." : "Invalid City.",
  }),
  country: z.string({
    error: (iss) =>
      iss.input === undefined ? "Country is required." : "Invalid Country.",
  }),
  description: z.string({
    error: (iss) =>
      iss.input === undefined
        ? "Description is required."
        : "Invalid Description.",
  }),
  type: z.string({
    error: (iss) =>
      iss.input === undefined ? "Type is required." : "Invalid Type.",
  }),
  adultCount: z.number({
    error: (iss) =>
      iss.input === undefined
        ? "AdultCount is required."
        : "Invalid AdultCount.",
  }),
  childCount: z.number({
    error: (iss) =>
      iss.input === undefined
        ? "ChildCount is required."
        : "Invalid ChildCount.",
  }),
  facilities: z.array(z.string(), {
    error: (iss) =>
      iss.input === undefined
        ? "Facilities are required."
        : "Invalid Facilities.",
  }),
  pricePerNight: z.number({
    error: (iss) =>
      iss.input === undefined
        ? "PricePerNight is required."
        : "Invalid PricePerNight.",
  }),
  starRating: z
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "StarRating is required."
          : "Invalid StarRating.",
    })
    .min(1, "StarRating must be at least 1")
    .max(5, "StarRating must be at most 5"),
});

export type CreateHotelInput = z.infer<typeof createHotelSchema>;
