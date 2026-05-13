import axiosClient from "./axiosClient";

export const getAllCarsAdmin = () => axiosClient.get("/admin/cars");

export const approveCar = (id) =>
  axiosClient.patch(`/admin/cars/${id}/approve`);

export const rejectCar = (id) => axiosClient.patch(`/admin/cars/${id}/reject`);
