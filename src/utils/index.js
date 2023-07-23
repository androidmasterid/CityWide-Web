import axios from "axios";

const BASE_URL = "https://citywide1.onrender.com/";
const TOKEN = localStorage.getItem("token");

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const HTTP = {
  get: (url, params) => API.get(url, { params }),
  post: (url, data) => API.post(url, data),
  patch: (url, data) => API.patch(url, data),
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
