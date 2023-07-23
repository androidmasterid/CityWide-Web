import axios from "axios";

const BASE_URL = "https://citywide1.onrender.com/";
const getToken = () => localStorage.getItem("token");

const getAxios = () =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const HTTP = {
  get: (url, params) => getAxios().get(url, { params }),
  post: (url, data) => getAxios().post(url, data),
  patch: (url, data) => getAxios().patch(url, data),
  put: (url, data) => getAxios().put(url, data),
  delete: (url, data) => getAxios().delete(url, data),
};

export const interpolateUrl = (template, params) => {
  let url = template;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, encodeURIComponent(value));
    });
  }

  return url;
};
