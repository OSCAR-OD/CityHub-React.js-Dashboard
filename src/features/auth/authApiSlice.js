import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

//const usersAdapter = createEntityAdapter({})
//const initialState = usersAdapter.getInitialState()

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
       // register process 
        register: builder.mutation({
         query: data => ({
            url: '/auth/register',
            method: 'POST',
            body: { ...data },
        }),
         }),
        forgotPassword: builder.mutation({
            query: credentials => ({
                url: '/auth/forgotPassword',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        resetPassword: builder.mutation({
           // query: (credentials, resetToken) => ({
            query: initialReq => ({
                url: `/auth/resetPassword/${initialReq.resetToken}`,
                method: 'PUT',
                body: { ...initialReq }
            })
        }),
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled

                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                  
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApiSlice 