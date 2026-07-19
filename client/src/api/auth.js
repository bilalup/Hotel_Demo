import axiosClient from "./axiosClient";

export const register = async ({ name, email, password }) => {
  const { data } = await axiosClient.post("/auth/register", { name, email, password });
  return data.data;
};

export const login = async (email, password) => {
  const { data } = await axiosClient.post("/auth/login", { email, password });
  return data.data;
};

export const fetchMe = async () => {
  const { data } = await axiosClient.get("/auth/me");
  return data.data;
};
