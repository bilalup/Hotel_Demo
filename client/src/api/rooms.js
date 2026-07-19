import axiosClient from "./axiosClient";

export const fetchRooms = async (filters = {}) => {
  const { data } = await axiosClient.get("/rooms", { params: filters });
  return data.data;
};

export const fetchRoom = async (idOrSlug) => {
  const { data } = await axiosClient.get(`/rooms/${idOrSlug}`);
  return data.data;
};

export const createRoom = async (payload) => {
  const { data } = await axiosClient.post("/rooms", payload);
  return data.data;
};

export const updateRoom = async (id, payload) => {
  const { data } = await axiosClient.put(`/rooms/${id}`, payload);
  return data.data;
};

export const deleteRoom = async (id) => {
  const { data } = await axiosClient.delete(`/rooms/${id}`);
  return data.data;
};
