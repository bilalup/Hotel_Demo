import axiosClient from "./axiosClient";

export const checkAvailability = async ({ roomId, checkIn, checkOut, roomsCount = 1 }) => {
  const { data } = await axiosClient.get("/bookings/availability", {
    params: { roomId, checkIn, checkOut, roomsCount },
  });
  return data.data;
};

export const createBooking = async (payload) => {
  const { data } = await axiosClient.post("/bookings", payload);
  return data.data;
};

export const fetchBookings = async (filters = {}) => {
  const { data } = await axiosClient.get("/bookings", { params: filters });
  return data;
};

export const fetchBooking = async (id) => {
  const { data } = await axiosClient.get(`/bookings/${id}`);
  return data.data;
};

export const updateBookingStatus = async (id, payload) => {
  const { data } = await axiosClient.patch(`/bookings/${id}/status`, payload);
  return data.data;
};

export const fetchDashboardStats = async () => {
  const { data } = await axiosClient.get("/bookings/stats");
  return data.data;
};
