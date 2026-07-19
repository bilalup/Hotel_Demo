import axiosClient from "./axiosClient";

export const fetchUsers = async () => {
  const { data } = await axiosClient.get("/users");
  return data.data;
};

export const updateUserRole = async (id, role) => {
  const { data } = await axiosClient.patch(`/users/${id}/role`, { role });
  return data.data;
};
