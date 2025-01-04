import axios from "axios";

const BASE_URL = "https://swift-sports-shop-server.vercel.app/api/v1";
// const BASE_URL = "http://localhost:4000/api/v1";

export const loginApi = async (credential) => {
   try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, credential);
      return response;
   } catch (err) {
      throw new Error(err?.response?.data);
   }
};
