import axiosClient from "./axiosClient";

export const sendMessage = async (payload) => {
  const { data } = await axiosClient.post("/contact", payload);
  return data.data;
};
