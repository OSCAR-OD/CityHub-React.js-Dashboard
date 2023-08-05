import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = postsAdapter.getInitialState()

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // getPosts: builder.query({
        //     query: (postId) => '/posts/${postId}',
        //     validateStatus: (response, result) => {
        //         return response.status === 200 && !result.isError
        //     },
        // }),
        // getPostsForEmployee: builder.query({
        //         query: () => '/posts/postsForEmployee',
        //         validateStatus: (response, result) => {
        //             return response.status === 200 && !result.isError
        //         },
        //         transformResponse: responseData => {
        //             const loadedPosts = responseData.map(post => {
        //                 post.id = post._id
        //                 return post
        //             });
        //             return postsAdapter.setAll(initialState, loadedPosts)
        //         },
        //         providesTags: (result, error, arg) => {
        //             if (result?.ids) {
        //                 return [
        //                     { type: 'Post', id: 'LIST' },
        //                     ...result.ids.map(id => ({ type: 'Post', id }))
        //                 ]
        //             } else return [{ type: 'Post', id: 'LIST' }]
        //         }
        //     }),
            // markPostAsViewed: builder.mutation({
            //     query: (postId) => ({
            //         url: `/posts/${postId}/markAsViewed`,
            //         method: 'PATCH',
            //       }),
            //     invalidatesTags: (result, error, arg) => [
            //         { type: 'Post', id: arg.id }
            //     ]
            // }),
        addNewPost: builder.mutation({
            query: postData => ({
                url: `/posts`,
                method: 'POST',
                body: {
                    ...postData,
                }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),
        updatePost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'PATCH',
                body: {
                    ...initialPost,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
       
    }),
})

export const {
   // useGetPostsQuery,
    useAddNewPostMutation,
    // useGetPostsForEmployeeQuery,
    // useMarkPostAsViewedMutation,
    useUpdatePostMutation,
    useDeletePostMutation
} = postsApiSlice

// export const selectPostsResult = postsApiSlice.endpoints.getPostsForEmployee.select()

// const selectPostsData = createSelector(
//     selectPostsResult,
//     postsResult => postsResult.data // normalized state object with ids & entities
// )

// export const {
//     selectAll: selectAllPosts,
//     selectById: selectPostById,
//     selectIds: selectPostIds
//     // Pass in a selector that returns the posts slice of state
// } = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)