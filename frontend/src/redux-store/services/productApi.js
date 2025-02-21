import { apiSlice } from "../slice/apiSlice";

const productApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllProduct: builder.query({
         query: () => ({
            url: `/products`,
         }),
         providesTags: ["products"],
      }),
      searchProduct: builder.query({
         query: ({
            categoryId,
            searchText,
            isAscending = true,
            category,
            brand,
            sortBy,
            categoryIds,
            itemPerPage = 10,
            page = 1,
         }) => ({
            url: `/products/search`,
            params: {
               categoryId,
               searchText,
               isAscending,
               category,
               brand,
               categoryIds,
               sortBy,
               itemPerPage,
               page,
            },
         }),
         providesTags: ["products"],
      }),
      getProductById: builder.query({
         query: (id) => ({
            url: `/products/${id}`,
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
   useGetProductByIdQuery,
   useGetAllProductQuery,
   useAddProductMutation,
   useSearchProductQuery,
   useEditProductMutation,
   useDeleteProductMutation,
} = productApi;
