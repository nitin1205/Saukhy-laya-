import z from "zod/v4";
import { ar } from "zod/v4/locales";

export const CreateHotelSchema = z.object({
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
  type: z.enum(
    [
      "Budget",
      "Boutique",
      "Luxury",
      "Ski Resort",
      "Business",
      "Family",
      "Romantic",
      "Hiking Resort",
      "Cabin",
      "Beach Resort",
      "Golf Resort",
      "Motel",
      "All Inclusive",
      "Pet Friendly",
      "Self Catering",
    ],
    {
      error: (iss) =>
        iss.input === undefined
          ? "Hotel type is required."
          : "Invalid Hotel type.",
    }
  ),
  adultCount: z.coerce.number({
    error: (iss) =>
      iss.input === undefined
        ? "AdultCount is required."
        : "Invalid AdultCount.",
  }),
  childCount: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "ChildCount is required."
          : "Invalid ChildCount.",
    })
    .min(0, "Child count cannot be negative"),
  facilities: z.array(
    z.enum([
      "Free WiFi",
      "Parking",
      "Airport Shuttle",
      "Family Rooms",
      "Non-Smoking Rooms",
      "Outdoor Pool",
      "Spa",
      "Fitness Center",
    ]),
    {
      error: (iss) =>
        iss.input === undefined
          ? "Facilities are required."
          : "Invalid Facilities.",
    }
  ),
  pricePerNight: z.coerce.number({
    error: (iss) =>
      iss.input === undefined
        ? "PricePerNight is required."
        : "Invalid PricePerNight.",
  }),
  starRating: z.coerce
    .number({
      error: (iss) =>
        iss.input === undefined
          ? "StarRating is required."
          : "Invalid StarRating.",
    })
    .min(1, "StarRating must be at least 1")
    .max(5, "StarRating must be at most 5"),
  imageFiles: z.any(),
});

export type CreateHotelInput = z.infer<typeof CreateHotelSchema>;

export const HotelIdParamsSchema = z.object({
  hotelId: z.coerce.string({
    error: (iss) =>
      iss.input === undefined ? "Hotel ID is required." : "Invalid Hotel ID.",
  }),
});

export type HotelIdParamsType = z.infer<typeof HotelIdParamsSchema>;

export const UpdateHotelSchema = CreateHotelSchema.extend({
  hotelId: z.string({
    error: (iss) =>
      iss.input === undefined ? "HotelId is required." : "Invalid HotelId.",
  }),
  imageUrls: z.array(z.string()).optional().default([]),
  imageFiles: z.any().optional(),
});

export type UpdateHotelInput = z.infer<typeof UpdateHotelSchema>;

const parseNumeric = (value: string | undefined): number | undefined => {
  if (value === undefined || value === "") return undefined;
  const parsed = Number(value);
  return isNaN(parsed) ? undefined : parsed;
};

const arrayOrSingle = <T extends z.ZodType>(schema: T) =>
  z
    .union([schema, z.array(schema)])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .transform((val) => val.filter((item) => item !== undefined));

export const SearchHotelQuerySchema = z
  .object({
    destination: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    adultCount: z
      .string()
      .optional()
      .transform(parseNumeric)
      .refine((val) => val === undefined || Number.isInteger(val), {
        message: "Must be an integer",
      }),
    checkIn: z
      .string()
      .optional()
      .transform((val) => {
        if (!val) return undefined;
        return new Date(val);
      }),
    checkOut: z
      .string()
      .optional()
      .transform((val) => {
        if (!val) return undefined;
        return new Date(val);
      }),
    childCount: z.string().default("0").transform(parseNumeric),
    facilities: arrayOrSingle(z.string()).optional(),
    types: arrayOrSingle(z.string()).optional(),
    stars: arrayOrSingle(z.string().transform(parseNumeric)).optional(),
    maxPrice: z
      .string()
      .optional()
      .transform((val) => {
        if (!val) return undefined;
        const parsed = parseFloat(val);
        return isNaN(parsed) ? undefined : parsed;
      })
      .refine((val) => val === undefined || val >= 0, {
        message: "Price must be positive",
      }),
    page: z.string().default("1").transform(parseNumeric),
    sortOption: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val))
      .pipe(
        z
          .enum(["starRating", "pricePerNightAsc", "pricePerNightDesc"])
          .optional()
      ),
  })
  .strict();

export type SearchHotelInput = z.infer<typeof SearchHotelQuerySchema>;
