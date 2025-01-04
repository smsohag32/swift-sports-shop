import { apiSlice } from "../slice/apiSlice";

const testApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllCategory: builder.query({
         query: () => ({
            url: `/categories`,
         }),
         providesTags: ["categories"],
      }),
   }),
});

export const { useGetAllCategoryQuery } = testApi;
