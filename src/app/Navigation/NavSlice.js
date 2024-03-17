import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hamPressed: false
}

export const NavSlice = createSlice({
    name: "navSlice",
    initialState,
    reducers: {
        funcHam: (state) => {
            state.hamPressed = !(state.hamPressed)
        }
    }
})

export const {funcHam} = NavSlice.actions;
export const hamBoolean = (state) => state.navSlice.hamPressed
export default NavSlice.reducer