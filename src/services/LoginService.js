import { useMutation } from "react-query";
import { HTTP } from "../utils";
import { Urls } from "../constants/Urls";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const login = async (payload) => {
  return await HTTP.post(Urls.LOGIN, payload);
};

export const useLogin = (config = {}) => {
  const navigate = useNavigate();
  return useMutation((data) => login(data), {
    ...config,
    onError: () => {
      navigate("/error");
      message.error("Invalid credentials");
    },
    onSettled: () => navigate("/dashboard"),
  });
};
