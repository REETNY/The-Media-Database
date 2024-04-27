import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

let key = import.meta.env.VITE_TMDBKey;

// "https://api.jikan.moe/v4"
export const TmdbApiSlice = createApi({
    reducerPath: "apiTMDB",
    tagTypes: ["TvShow", "Movies"],
    baseQuery: fetchBaseQuery({baseUrl: "https://api.themoviedb.org/3"}),
    endpoints: (builder) => ({})
})
