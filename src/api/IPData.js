import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const IPDataApi = createApi({
    reducerPath: "apiIPData",
    tagTypes: ["IPData"],
    baseQuery: fetchBaseQuery({baseUrl: "https://api.ipdata.co"}),
    endpoints: (builder) => ({})
})