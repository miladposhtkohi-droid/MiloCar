import axiosClient from "./axiosClient";

export const getAllCarsAdmin = () =>
  axiosClient.get("/admin/cars");

export const approveCar = (carId) =>
  axiosClient.patch(`/admin/cars/${carId}/approve`);

export const rejectCar = (carId) =>
  axiosClient.patch(`/admin/cars/${carId}/reject`);
