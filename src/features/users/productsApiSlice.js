import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const productsAdapter = createEntityAdapter({})

const initialState = productsAdapter.getInitialState()

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // getUsers: builder.query({
        //     query: () => '/products',
        //     validateStatus: (response, result) => {
        //         return response.status === 200 && !result.isError
        //     },
        //     transformResponse: responseData => {
        //         const loadedUsers = responseData.map(product => {
        //             product.id = product._id
        //             return product
        //         });
        //         return productsAdapter.setAll(initialState, loadedUsers)
        //     },
        //     providesTags: (result, error, arg) => {
        //         if (result?.ids) {
        //             return [
        //                 { type: 'User', id: 'LIST' },
        //                 ...result.ids.map(id => ({ type: 'User', id }))
        //             ]
        //         } else return [{ type: 'User', id: 'LIST' }]
        //     }
        // }),
  ////////////////////  
        //ok
        addNewProduct: builder.mutation({
            query: formData => ({
                url: '/products',
                method: 'POST',
                body: 
                {
                    ...formData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
//////////////////////////
        // addNewProduct: builder.mutation({
        //     query: ({ formData }) => ({
        //         url: '/products',
        //         method: 'POST',
        //         body: formData,
        //     }),
        //     invalidatesTags: [
        //         { type: 'User', id: "LIST" }
        //     ]
        // }),
     ////////////////
        // updateUser: builder.mutation({
        //     query: initialUserData => ({
        //         url: '/products',
        //         method: 'PATCH',
        //         body: {
        //             ...initialUserData,
        //         }
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: 'User', id: arg.id }
        //     ]
        // }),
        // updateProfile: builder.mutation({
        //     query: initialUserData => ({
        //         url: '/products',
        //         method: 'PATCH',
        //         body: {
        //             ...initialUserData,
        //         }
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: 'User', id: arg.id }
        //     ]
        // }),
        // deleteUser: builder.mutation({
        //     query: ({ id }) => ({
        //         url: `/products`,
        //         method: 'DELETE',
        //         body: { id }
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: 'User', id: arg.id }
        //     ]
        // }),
    }),
})

export const {
    useAddNewProductMutation,
    // useGetUsersQuery,
    // useUpdateUserMutation,
    // useDeleteUserMutation,
    // useUpdateProfileMutation,
} = productsApiSlice

// returns the query result object
// export const selectUsersResult = productsApiSlice.endpoints.getUsers.select()

// // creates memoized selector
// const selectUsersData = createSelector(
//     selectUsersResult,
//     productsResult => productsResult.data // normalized state object with ids & entities
// )

//getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllUsers,
//     selectById: selectUserById,
//     selectIds: selectUserIds
//     // Pass in a selector that returns the products slice of state
// } = productsAdapter.getSelectors(state => selectUsersData(state) ?? initialState)