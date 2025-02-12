import { apiSlice } from "../slice/apiSlice";

const userApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUser: builder.query({
         query: ({ id }) => ({
            url: `/users/${id}`,
         }),
         providesTags: ["user"],
      }),
      registerUser: builder.mutation({
         query: (newUser) => ({
            url: `/auth/register`,
            method: "POST",
            body: newUser,
         }),
         providesTags: ["user"],
      }),
   }),
});

export const { useGetUserQuery, useRegisterUserMutation } = userApi;
