import axiosClient from "./axiosClient";

export const fetchSettings = async () => {
  const { data } = await axiosClient.get("/settings");
  return data.data;
};

export const updateSettings = async (payload) => {
  const { data } = await axiosClient.put("/settings", payload);
  return data.data;
};
