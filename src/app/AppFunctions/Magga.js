import { createSlice } from "@reduxjs/toolkit";
import { MaggaApi } from "../../api/MaggaApi";

const MaggaHeader = {
    "username": import.meta.env.VITE_MAGGA_API_KEY,
    "password": import.meta.env.VITE_MAGGA_API_SECRET,
}

const createRequest = (url) => ({url, headers: MaggaHeader})

export const MaggaApiSlice = MaggaApi.injectEndpoints({
    endpoints: (builder) => ({
        getColors: builder.query({
            query: ({encodeImg}) => createRequest(`/colors?image_url=${encodeImg}`)
        })
    })
})

export const {useGetColorsQuery} = MaggaApiSlice