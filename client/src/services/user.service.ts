import {
  LoginFormPayload,
  SignupFormPayload,
  UserUpdatePayload,
} from "../types/user.types";
import axios from "axios";
import { API_URL, authToken, handleResponse } from "./utils.service";

export const singupUser = async (payload: SignupFormPayload) => {
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

export const loginUser = async (payload: LoginFormPayload) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, payload, {
      validateStatus: () => true,
    });
    return handleResponse(response);
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.error("Network or server error:", err.message);
    }
    throw new Error(err.message || "Login failed. Please try again later.");
  }
};

export const updateUser = async (payload: UserUpdatePayload) => {
  try {
    const response = await axios.put(`${API_URL}/user`, payload, {
      validateStatus: () => true,
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return handleResponse(response);
  } catch (err: any) {
    throw new Error(
      err.message || "User Update failed. Please try again later."
    );
  }
};
