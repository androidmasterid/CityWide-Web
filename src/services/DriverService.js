import { useMutation, useQuery, useQueryClient } from "react-query";
import { HTTP, interpolateUrl } from "../utils";
import { Urls } from "../constants/Urls";

export const DEFAULT_QUERY_CONFIG = {
  staleTime: 1800000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchOnMount: false,
  retry: 0,
};

const driverKeys = {
  drivers: ["drivers"],
  create: (key) => ["drivers", key],
  list: (params = {}) => [...driverKeys.drivers, params],
  detail: (driverId) => [...driverKeys.drivers, driverId],
};

const fetchDrivers = async (params) => {
  return await HTTP.get(Urls.DRIVERS, params);
};

export const useGetDriversList = (params = {}, config = {}) => {
  return useQuery(driverKeys.list(params), () => fetchDrivers(params), {
    ...DEFAULT_QUERY_CONFIG,
    ...config,
  });
};

const fetchDriverDetail = async (driverId) => {
  return await HTTP.get(interpolateUrl(Urls.DRIVER_DETAIL, { driverId }));
};

export const useGetDriverDetail = (driverId, config = {}) => {
  return useQuery(
    driverKeys.detail(driverId),
    () => fetchDriverDetail(driverId),
    {
      ...DEFAULT_QUERY_CONFIG,
      ...config,
    }
  );
};

const updateDriver = async (driverId, data) => {
  return await HTTP.patch(
    interpolateUrl(Urls.UPDATE_DRIVER_DETAIL, { driverId }),
    data
  );
};

export const useUpdateDriver = (driverId, config = {}) => {
  const queryClient = useQueryClient();
  return useMutation((data) => updateDriver(driverId, data), {
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries(driverKeys.detail(driverId), {
        exact: false,
        refetchInactive: true,
      });
    },
  });
};

const verifyDriver = async (data) => {
  return await HTTP.patch(Urls.VERIFY_DRIVER, data);
};

export const useVerifyDriver = (config = {}) => {
  const queryClient = useQueryClient();
  return useMutation((data) => verifyDriver(data), {
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries(driverKeys.create(), {
        exact: false,
        refetchInactive: true,
      });
    },
  });
};
