import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const MaggaApi = createApi({
    reducerPath: "apiMagga",
    tagTypes: ["Magga"],
    baseQuery: fetchBaseQuery({baseUrl: "https://api.imagga.com/v2"}),
    endpoints: (builder) => ({})
})