import { apiSlice } from "../slice/apiSlice";

const userApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUser: builder.query({
         query: ({ id }) => ({
            url: `/users/${id}`,
         }),
         providesTags: ["user"],
      }),
   }),
});

export const { useGetUserQuery } = userApi;
