import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// "https://api.jikan.moe/v4"
export const JikanApiSlice = createApi({
    reducerPath: "apiJikan",
    tagTypes: ["Anime", "Manga"],
    baseQuery: fetchBaseQuery({baseUrl: "https://api.jikan.moe/v4"}),
    endpoints: (builder) => ({})
})
