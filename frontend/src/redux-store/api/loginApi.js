import axios from "axios";

const BASE_URL = "";

export const loginApi = async (credential) => {
   try {
      const response = axios.post(`${BASE_URL}/signin`, credential);
      return response.data;
   } catch (err) {
      throw new Error(err?.response?.data?.message);
   }
};
