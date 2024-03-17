import { createEntityAdapter } from "@reduxjs/toolkit";
import { JikanApiSlice } from "../../api/JikanApi";
import { createSelector } from "@reduxjs/toolkit";

const fetchAdapter = createEntityAdapter()

const initialState = fetchAdapter.getInitialState({
    searchParams: "",
    moreDets: {}
})

export const extendedJikanApi = JikanApiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getMangas: builder.query({
            query: (arg) => ({
                url: arg ? `/manga` : `/manga?page=1`,
                params: arg
            }),
            transformResponse: (res) => {
                let fetchedData = [...res.data.map((item) => {
                    return {
                        ...item,
                        id: item.mal_id
                    }
                })]
                initialState.moreDets = {...res.pagination}
                return fetchAdapter.setAll(initialState, fetchedData);
            },
            providesTags: (result, error, args) => [
                {type: "Manga", id: "LIST"}, 
                ...result.ids.map((id) => ({type: "Manga", id}))
            ]
        }),

        getFullManga : builder.query({
            query: (arg) => ({
                url: `/manga/${arg}/full`,
            }),
            transformResponse: (res) => {
                let resp = {...res.data}
                resp[`id`] = resp.mal_id;
                return fetchAdapter.addOne(initialState, resp);
            },
            providesTags: (result, error, args) => [
                {type: "Manga", id: result.id}
            ]
        }),

        mutateQueryParams: builder.mutation({
            query: () => ({
                
            }),
            invalidatesTags: () => [{type: "Manga", id: "LIST"}]
        }),

        MangaCast: builder.query({
            query: ({id}) => ({
                url: `https://api.jikan.moe/v4/manga/${id}/characters`
            })
        }),

        MangaSocials: builder.query({
            query:({id, type}) => ({
                url: `https://api.jikan.moe/v4/manga/${id}/${type}`,
            })
        }),
        MangaPictures: builder.query({
            query: ({id}) => ({
                url: `https://api.jikan.moe/v4/manga/${id}/pictures`
            })
        }),
        MangaRecommendation: builder.query({
            query: ({id}) => ({
                url: `https://api.jikan.moe/v4/manga/${id}/recommendations`
            })
        }),
        

        MoreInfo: builder.query({
            query: ({type, id}) => ({
                url: `https://api.jikan.moe/v4/${type}/${id}/moreinfo`
            })
        }),

        // mangas end

        getAnimes: builder.query({
            query: (arg) => ({
                url: arg ? `/anime` : `/anime?page=1`,
                params: arg
            }),
            transformResponse: (res) => {
                let fetchedData = [...res.data.map((item) => {
                    return {
                        ...item,
                        id: item.mal_id
                    }
                })]
                initialState.moreDets = {...res.pagination}
                return fetchAdapter.setAll(initialState, fetchedData);
            },
            providesTags: (result, error, args) => [
                {type: "Anime", id: "LIST"}, 
                ...result.ids.map((id) => ({type: "Anime", id}))
            ],
            invalidatesTags: ["Anime"]
        }),
        getFullAnime : builder.query({
            query: (arg) => ({
                url: `/anime/${arg}/full`,
            }),
            transformResponse: (res) => {
                let resp = {...res.data}
                resp[`id`] = resp.mal_id;
                return fetchAdapter.addOne(initialState, resp);
            },
            providesTags: (result, error, args) => [
                {type: "Anime", id: result.id}
            ],
            invalidatesTags: ["Anime"]
        }),
        AnimeCast: builder.query({
            query: ({id}) => ({
                url: `https://api.jikan.moe/v4/anime/${id}/characters`
            }),
            providesTags: (args) => [{type: "Anime", id: args.id}],
            invalidatesTags: ["Anime"]
        }),
        AnimePictures: builder.query({
            query: ({id}) => ({
                url: `https://api.jikan.moe/v4/anime/${id}/pictures`
            }),
            providesTags: (result, err, args) => [{type: "Anime", id: args.id}],
            invalidatesTags: ["Anime"]
        }),
        AnimeRecommendation: builder.query({
            query: ({id}) => ({
                url: `https://api.jikan.moe/v4/anime/${id}/recommendations`
            }),
            providesTags: (result, err, args) => [{type: "Anime", id: args.id}],
            invalidatesTags: ["Anime"]
        }),
        AnimeVideos: builder.query({
            query : ({id}) => ({
                url: `https://api.jikan.moe/v4/anime/${id}/videos`
            }),
            providesTags: (result, err, args) => [{type: "Anime", id: args.id}],
            invalidatesTags: ["Anime"]
        }),
        AnimeSocials: builder.query({
            query:({id, type}) => ({
                url: `https://api.jikan.moe/v4/anime/${id}/${type}`,
            }),
            providesTags: (result, err, args) => [{type: "Anime", id: args.id}],
            invalidatesTags: ["Anime"]
        })
    })
})

export const { 
    useGetMangasQuery, 
    useMutateQueryParamsMutation, 
    useGetFullMangaQuery, 
    useMangaCastQuery, 
    useMangaSocialsQuery, 
    useMangaPicturesQuery, 
    useMangaRecommendationQuery, 
    
    useGetAnimesQuery, 
    useGetFullAnimeQuery, 
    useAnimeCastQuery, 
    useAnimePicturesQuery, 
    useAnimeRecommendationQuery,
    useAnimeVideosQuery,
    useAnimeSocialsQuery,

    useMoreInfoQuery
} = extendedJikanApi

const selectData = extendedJikanApi.endpoints.getMangas.select(
    
);

const MMS = createSelector(
    selectData,
    selectdata =>  selectdata.data
)

export const { 
    selectAll: selectAllData,
    selectById: selectDataById,
    selectIds: selectDataIds
} = fetchAdapter.getSelectors(state => MMS(state) ?? initialState)  