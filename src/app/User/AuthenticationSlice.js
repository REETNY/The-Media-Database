import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userDetails: JSON.parse(localStorage.getItem("UnKeyedFile")) || {username: "ajidex@2001", password: "1234"},
    isLoggedIn: false
}


export const AuthenticationSlice = createSlice({
    name: "authenticateSlice",
    initialState,
    reducers: {
        signinMethod: (state, action) => {

        },
        signupMethod: (state, action) => {

        },
        logoutMethod: (state) => {

        },
        getUserValid: () => {

            return state.isLoggedIn
        }
    }
})

export const isLoggedState = (state) => state.authenticateSlice.isLoggedIn;
export const {signinMethod, signupMethod, logoutMethod, getUserValid} = AuthenticationSlice.actions
export default AuthenticationSlice.reducer