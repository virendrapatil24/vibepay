import { SignupFormPayload } from "../types/user.types";
import axios, { AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const handleResponse = (response: AxiosResponse) => {
  const { status, data } = response;
  if (status !== 201) {
    throw new Error(data?.error || "Something went wrong");
  }
  return data;
};

export const singup = async (payload: SignupFormPayload) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, payload, {
      validateStatus: () => true,
    });
    return handleResponse(response);
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.error("Network or server error:", err.message);
    }
    throw new Error(err.message || "Signup failed. Please try again later.");
  }
};
