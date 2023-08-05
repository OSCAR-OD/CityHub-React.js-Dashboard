import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const formsAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = formsAdapter.getInitialState()

export const formApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    submitForm: builder.mutation({
      query: (formData) => ({
        url: '/forms',
        method: 'POST',
        body: {
          ...formData,
        }
        }),
    }),
    getForms: builder.query({
      query: () => '/forms',
      validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
          const loadedForms = responseData.map(form => {
              form.id = form._id
              return form
          });
          return formsAdapter.setAll(initialState, loadedForms)
      },
      providesTags: (result, error, arg) => {
          if (result?.ids) {
              return [
                  { type: 'Form', id: 'LIST' },
                  ...result.ids.map(id => ({ type: 'Form', id }))
              ]
          } else return [{ type: 'Form', id: 'LIST' }]
      }
  }),
  }),
});
export const {
  useSubmitFormMutation,
  useGetFormsQuery,
 } =  formApiSlice;

export const selectFormsResult = formApiSlice.endpoints.getForms.select()


// creates memoized selector
const selectFormsData = createSelector(
  selectFormsResult,
  formsResult => formsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllForms,
  selectById: selectFormById,
  selectIds: selectFormIds
  // Pass in a selector that returns the forms slice of state
} = formsAdapter.getSelectors(state => selectFormsData(state) ?? initialState)