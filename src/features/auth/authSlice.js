import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        token: null, 
        //theme: 'light',
        theme: localStorage.getItem('themeMode') || 'light',
        profilePic: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        },
        setTheme: (state, action) => {
            state.theme = action.payload; // add a new reducer to set theme
        },
        setProfilePic: (state, action) => {
            state.profilePic = action.payload; // Set the profile picture
        }
    }
})

export const { setCredentials, logOut, setTheme, setProfilePic } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentTheme = (state) => state.auth.theme;
export const selectProfilePic = (state) => state.auth.profilePic;
