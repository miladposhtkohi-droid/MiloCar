import axiosClient from "./axiosClient";

export const createBooking = (bookingData) =>
  axiosClient.post("/bookings", bookingData);

export const getMyBookings = () =>
  axiosClient.get("/bookings/my");

export const cancelBooking = (id) =>
  axiosClient.put(`/bookings/${id}/cancel`);
