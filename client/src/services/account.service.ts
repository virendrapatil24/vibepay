import axios from "axios";
import { API_URL, authToken, handleResponse } from "./utils.service";
import { sendMoneyPayload } from "../types/account.types";

export const getBalance = async () => {
  try {
    const response = await axios.get(`${API_URL}/account/balance`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return handleResponse(response);
  } catch (err: any) {
    throw new Error(err.message || "Failed while fetching current balance!");
  }
};

export const searchUsers = async (userName: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/bulk`, {
      params: { userName },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return handleResponse(response);
  } catch (err: any) {
    throw new Error(err.message || "Failed to search users!");
  }
};

export const sendMoney = async (payload: sendMoneyPayload) => {
  try {
    const response = await axios.post(`${API_URL}/account/send`, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      validateStatus: () => true,
    });

    return handleResponse(response);
  } catch (err: any) {
    throw new Error(err.message || "Failed to send money to recipient");
  }
};
