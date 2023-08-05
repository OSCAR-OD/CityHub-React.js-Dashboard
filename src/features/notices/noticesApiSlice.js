import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const noticesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = noticesAdapter.getInitialState()

export const noticesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotices: builder.query({
            query: (noticeId) => '/notices/${noticeId}',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        getNoticesForEmployee: builder.query({
                query: () => '/notices/noticesForEmployee',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: responseData => {
                    const loadedNotices = responseData.map(notice => {
                        notice.id = notice._id
                        return notice
                    });
                    return noticesAdapter.setAll(initialState, loadedNotices)
                },
                providesTags: (result, error, arg) => {
                    if (result?.ids) {
                        return [
                            { type: 'Notice', id: 'LIST' },
                            ...result.ids.map(id => ({ type: 'Notice', id }))
                        ]
                    } else return [{ type: 'Notice', id: 'LIST' }]
                }
            }),
            markNoticeAsViewed: builder.mutation({
                query: (noticeId) => ({
                    url: `/notices/${noticeId}/markAsViewed`,
                    method: 'PATCH',
                  }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Notice', id: arg.id }
                ]
            }),
        addNewNotice: builder.mutation({
            query: noticeData => ({
                url: `/notices`,
                method: 'POST',
                body: {
                    ...noticeData,
                }
            }),
            invalidatesTags: [
                { type: 'Notice', id: "LIST" }
            ]
        }),
        updateNotice: builder.mutation({
            query: initialNotice => ({
                url: '/notices',
                method: 'PATCH',
                body: {
                    ...initialNotice,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Notice', id: arg.id }
            ]
        }),

        deleteNotice: builder.mutation({
            query: ({ id }) => ({
                url: `/notices`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Notice', id: arg.id }
            ]
        }),
       
    }),
})

export const {
   // useGetNoticesQuery,
    useAddNewNoticeMutation,
    useGetNoticesForEmployeeQuery,
    useMarkNoticeAsViewedMutation,
    useUpdateNoticeMutation,
    useDeleteNoticeMutation
} = noticesApiSlice

// returns the query result object
export const selectNoticesResult = noticesApiSlice.endpoints.getNoticesForEmployee.select()

// creates memoized selector
const selectNoticesData = createSelector(
    selectNoticesResult,
    noticesResult => noticesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotices,
    selectById: selectNoticeById,
    selectIds: selectNoticeIds
    // Pass in a selector that returns the notices slice of state
} = noticesAdapter.getSelectors(state => selectNoticesData(state) ?? initialState)