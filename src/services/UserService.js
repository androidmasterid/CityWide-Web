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

const userKeys = {
  users: ["users"],
  create: (key) => ["users", key],
  list: (params = {}) => [...userKeys.users, params],
  detail: (userId) => [...userKeys.users, userId],
};

const fetchUsers = async (params) => {
  return await HTTP.get(Urls.USERS, params);
};

export const useGetUsersList = (params = {}, config = {}) => {
  return useQuery(userKeys.list(params), () => fetchUsers(params), {
    ...DEFAULT_QUERY_CONFIG,
    ...config,
  });
};

const fetchUserDetail = async (userId) => {
  return await HTTP.get(interpolateUrl(Urls.USER_DETAIL, { userId }));
};

export const useGetUserDetail = (userId, config = {}) => {
  return useQuery(userKeys.detail(userId), () => fetchUserDetail(userId), {
    ...DEFAULT_QUERY_CONFIG,
    ...config,
  });
};

const updateUser = async (userId, data) => {
  return await HTTP.patch(
    interpolateUrl(Urls.UPDATE_USER_DETAIL, { userId }),
    data
  );
};

export const useUpdateUser = (userId, config = {}) => {
  const queryClient = useQueryClient();
  return useMutation((data) => updateUser(userId, data), {
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries(userKeys.detail(userId), {
        exact: false,
        refetchInactive: true,
      });
    },
  });
};

const deleteUser = async (userId, data) => {
  return await HTTP.delete(interpolateUrl(Urls.DELETE_USER, { userId }), data);
};

export const useDeleteUser = (config = {}) => {
  const queryClient = useQueryClient();
  return useMutation((userId, data) => deleteUser(userId, data), {
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries(userKeys.list(), {
        exact: false,
        refetchInactive: true,
      });
    },
  });
};
