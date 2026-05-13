import axiosClient from "./axiosClient";

export const getAllCars = (params = {}) => axiosClient.get("/cars", { params });

export const getMyCars = () => axiosClient.get("/cars/my");

export const getCarById = (id) => axiosClient.get(`/cars/${id}`);

export const createCar = (data) =>
  axiosClient.post("/cars", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateCar = (id, data) =>
  axiosClient.put(`/cars/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteCar = (id) => axiosClient.delete(`/cars/${id}`);
