import { apiSlice } from "../slice/apiSlice";

const productApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllProduct: builder.query({
         query: () => ({
            url: `/products`,
         }),
         providesTags: ["products"],
      }),
      addProduct: builder.mutation({
         query: (formData) => ({
            url: `/products`,
            method: "POST",
            body: formData,
         }),
         providesTags: ["products"],
      }),
      editProduct: builder.mutation({
         query: ({ id, formData }) => ({
            url: `/products/${id}`,
            method: "PUT",
            body: formData,
         }),
         providesTags: ["products"],
      }),
      deleteProduct: builder.mutation({
         query: (id) => ({
            url: `/products/${id}`,
            method: "DELETE",
         }),
         providesTags: ["products"],
      }),
   }),
});

export const {
   useGetAllProductQuery,
   useAddProductMutation,
   useEditProductMutation,
   useDeleteProductMutation,
} = productApi;
