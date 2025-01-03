import { apiSlice } from "../slice/apiSlice";

const testApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getTest: builder.query({
         query: () => ({
            url: `/products`,
         }),
         providesTags: ["products"],
      }),
   }),
});

export const { useGetTestQuery } = testApi;
