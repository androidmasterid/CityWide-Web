import { useQuery } from "react-query";
import { HTTP } from "../utils";
import { Urls } from "../constants/Urls";

export const DEFAULT_QUERY_CONFIG = {
  staleTime: 1800000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchOnMount: false,
  retry: 0,
};

const bookingKeys = {
  bookings: ["bookings"],
  list: (params = {}) => [...bookingKeys.bookings, params],
};

const fetchBooking = async (params) => {
  return await HTTP.get(Urls.BOOKING, params);
};

export const useGetBookingsList = (params = {}, config = {}) => {
  return useQuery(bookingKeys.list(params), () => fetchBooking(params), {
    ...DEFAULT_QUERY_CONFIG,
    ...config,
  });
};
