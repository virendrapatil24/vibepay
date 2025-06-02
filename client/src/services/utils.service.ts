import { AxiosResponse } from "axios";

export const API_URL = import.meta.env.VITE_API_URL;
export const authToken = localStorage.getItem("vibepayAuthToken");

export const handleResponse = (response: AxiosResponse) => {
  const { status, data } = response;
  if (status !== 200 && status !== 201) {
    throw new Error(data?.error || "Something went wrong");
  }
  return data;
};
