import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    openFil: false
}

const HeaderSlice = createSlice({
    name: "headerSlice",
    initialState,
    reducers: {
        changeOpenFil: (state) => {
            state.openFil = !state.openFil
        }
    }
})

export const {changeOpenFil} = HeaderSlice.actions
export const getFilState = (state) => state.headerSlice.openFil
export default HeaderSlice.reducer
