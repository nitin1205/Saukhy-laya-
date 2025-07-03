import HotelModel from "../models/hotelModel";
import {
  SearchHotelInput,
  SearchHotelQuerySchema,
} from "../schema/hotelSchema";
import { HotelSearchResponse } from "../shared/types";

export async function findHotelsWithQueryLimitAndPageSize(
  queryInput: SearchHotelInput
): Promise<HotelSearchResponse> {
  try {
    const paresedQuery = SearchHotelQuerySchema.parse(queryInput);

    const mongoQuery = constructHotelSearcQuery(paresedQuery);

    let sortOptions = {};
    switch (paresedQuery.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      paresedQuery.page ? paresedQuery.page.toString() : "1"
    );

    const skip = (pageNumber - 1) * pageSize;

    const hotels = await HotelModel.find(mongoQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const totalHotels = await HotelModel.countDocuments(mongoQuery);

    return {
      data: hotels,
      pagination: {
        total: totalHotels,
        page: pageNumber,
        pages: Math.ceil(totalHotels / pageSize),
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}

const constructHotelSearcQuery = (queryParams: SearchHotelInput) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = { $gte: queryParams.adultCount };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = { $gte: queryParams.childCount };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = { $all: queryParams.facilities };
  }

  if (queryParams.types) {
    constructedQuery.type = { $in: queryParams.types };
  }

  if (queryParams.stars) {
    constructedQuery.starRating = { $in: queryParams.stars };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = { $lte: queryParams.maxPrice };
  }

  return constructedQuery;
};
