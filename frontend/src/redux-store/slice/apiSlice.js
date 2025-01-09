import { getCookie } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = async (args, api, extraOptions) => {
   const baseQuery = fetchBaseQuery({
      baseUrl: "https://swift-sports-shop-server.vercel.app/api/v1",
      // baseUrl: "http://localhost:4000/api/v1",
      prepareHeaders: (headers) => {
         const token = getCookie("access_token");
         if (token) {
            headers.set("Authorization", `Bearer ${token}`);
         }
         return headers;
      },
   });

   let result = await baseQuery(args, api, extraOptions);
   if (result.error && (result.error.status === 401 || result.error.status === 403)) {
      window.location.href = "/authentication/login";
   }

   return result;
};

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: baseQueryWithAuth,
   tagTypes: ["users", "product", "carts", "categories"],
   endpoints: () => ({}),
});
