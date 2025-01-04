import { apiSlice } from "../slice/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllCategory: builder.query({
         query: () => ({
            url: `/categories`,
         }),
         providesTags: ["categories"],
      }),
      addCategory: builder.mutation({
         query: (formData) => ({
            url: `/categories`,
            method: "POST",
            body: formData,
         }),
         providesTags: ["categories"],
      }),
      editCategory: builder.mutation({
         query: ({ id, formData }) => ({
            url: `/categories/${id}`,
            method: "PUT",
            body: formData,
         }),
         providesTags: ["categories"],
      }),
      deleteCategory: builder.mutation({
         query: (id) => ({
            url: `/categories/${id}`,
            method: "DELETE",
         }),
         providesTags: ["categories"],
      }),
   }),
});

export const {
   useGetAllCategoryQuery,
   useAddCategoryMutation,
   useEditCategoryMutation,
   useDeleteCategoryMutation,
} = categoryApi;
