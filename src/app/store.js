import { configureStore } from "@reduxjs/toolkit";
import NavSlice from "./Navigation/NavSlice";
import AuthenticationSlice from "./User/AuthenticationSlice";
import { JikanApiSlice } from "../api/JikanApi";
import HeaderSlice from "./AppFunctions/headerFuncs";
import FilterSlice1 from "./Oth/FilterSlice1";
import DataDetzSlice from "./AppFunctions/DataDetzSlice";
import { MaggaApi } from "../api/MaggaApi";
import { TmdbApiSlice } from "../api/TMDB";
import { IPDataApi } from "../api/IPData";
import ColorPicker from "./AppFunctions/colorPicker"

export const store = configureStore({
    reducer:{
        filterSlice1: FilterSlice1,
        colorPicker: ColorPicker,
        navSlice: NavSlice,
        authenticateSlice: AuthenticationSlice,
        headerSlice: HeaderSlice,
        dataDetzSlice: DataDetzSlice,
        [JikanApiSlice.reducerPath]: JikanApiSlice.reducer,
        [MaggaApi.reducerPath]: MaggaApi.reducer,
        [TmdbApiSlice.reducerPath]: TmdbApiSlice.reducer,
        [IPDataApi.reducerPath]: IPDataApi.reducer

    },

    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(JikanApiSlice.middleware, MaggaApi.middleware, TmdbApiSlice.middleware, IPDataApi.middleware)
})