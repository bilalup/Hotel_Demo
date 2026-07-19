import axiosClient from "./axiosClient";

export const fetchTestimonials = async () => {
  const { data } = await axiosClient.get("/testimonials");
  return data.data;
};
