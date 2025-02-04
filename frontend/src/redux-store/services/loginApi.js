import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginApi = async (credential) => {
   try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, credential);
      return response;
   } catch (err) {
      throw new Error(err?.response?.data);
   }
};
