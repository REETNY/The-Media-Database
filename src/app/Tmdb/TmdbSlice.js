import { createEntityAdapter } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { TmdbApiSlice } from "../../api/TMDB"; 

const fetchAdapter = createEntityAdapter()

const initialState = fetchAdapter.getInitialState({
    searchParams: "",
    moreDets: {}
})

export const extendedTmdbApi = TmdbApiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getGenres: builder.query({
            query:({option}) => ({
                url: `/genre/${option}/list?language=en`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),
        getCertification: builder.query({
            query:({option}) => ({
                url: `/certification/${option}/list`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),
        getWatchProvider: builder.query({
            query: ({option, region}) => ({
                url: `/watch/providers/${option}?language=en-US&watch_region=${region}`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),

        // 

        getMovies: builder.query({
            query: ({options, type}) => ({
                url: Object.keys(options).length > 0 ? `/discover/movie` : `/movie/${type}?page=1`,
                params: options,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            }),
            transformResponse: (res) => {

                let details = {
                    num_of_pages: res?.total_pages,
                    last_visible_page: res?.total_pages,
                    num_of_item: res?.total_results,
                    current_page: res?.page,
                    items: {
                        per_page: res?.results?.length,
                        count: res?.results?.length,
                        total: res?.total_results
                    },
                    has_next_page: res?.page < res?.total_pages
                }
                initialState.moreDets = details
                return fetchAdapter.setAll(initialState, res?.results)
            },
            providesTags: (err, result, args) => 
            result 
            ? [...result?.ids?.map((id)  => ({item: "Movies", id}))]
            : [{type: "Movies", id: "LIST"}]
        }),

        getSeries: builder.query({
            query: ({options, type}) => ({
                url: Object.keys(options).length > 0 ? `/discover/tv` : `/tv/${type}?page=1`,
                params: options,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            }),
            transformResponse: (res) => {

                let details = {
                    num_of_pages: res?.total_pages,
                    last_visible_page: res?.total_pages,
                    num_of_item: res?.total_results,
                    current_page: res?.page,
                    items: {
                        per_page: res?.results?.length,
                        count: res?.results?.length,
                        total: res?.total_results
                    },
                    has_next_page: res?.page < res?.total_pages
                }
                initialState.moreDets = details
                return fetchAdapter.setAll(initialState, res?.results)
            },
            providesTags: (err, result, args) => 
            result 
            ? [...result?.ids?.map((id)  => ({item: "Movies", id}))]
            : [{type: "Movies", id: "LIST"}]
        }),

        getMoviesById: builder.query({
            query: ({id}) => ({
                url: `/movie/${id}?append_to_response=videos`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),

        getSeriesById: builder.query({
            query: ({id}) => ({
                url: `/tv/${id}?append_to_response=videos`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),

        getReview: builder.query({
            query: ({id, type}) => ({
                url: `https://api.themoviedb.org/3/${type}/${id}/reviews`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),

        getDiscussion: builder.query({
            query: ({id, type}) => ({
                url: `https://api.themoviedb.org/3/${type}/${id}/reviews`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),

        getVideos: builder.query({
            query: ({id, type}) => ({
                url: `https://api.themoviedb.org/3/${type}/${id}/videos`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }), 

        getReleases: builder.query({
            query: ({id, type}) => ({
                url: `https://api.themoviedb.org/3/${type}/${id}/release_dates`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),

        getRecommendation: builder.query({
            query: ({id, type}) => ({
                url: `https://api.themoviedb.org/3/${type}/${id}/recommendations`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),

        getImages:builder.query({
            query: ({type, id}) => ({
                url: `https://api.themoviedb.org/3/${type}/${id}/images`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),

        getCredits: builder.query({
            query: ({type, id}) => ({
                url: `https://api.themoviedb.org/3/${type}/${id}/credits`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),

        getAltTitles: builder.query({
            query: ({type, id}) => ({
                url: `https://api.themoviedb.org/3/${type}/${id}/alternative_titles`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),

        getTranslation: builder.query({
            query: ({type, id}) => ({
                url: `https://api.themoviedb.org/3/${type}/${id}/translations`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        }),

        getWatch: builder.query({
            query: ({type, id}) => ({
                url: `https://api.themoviedb.org/3/${type}/${id}/watch/providers`,
                headers: {
                    Authorization: `${import.meta.env.VITE_TMDBKey}`,
                    accept: 'application/json'
                }
            })
        })

        
    })
})


export const { useGetGenresQuery, useGetCertificationQuery, useGetWatchProviderQuery, useGetMoviesQuery, useGetMoviesByIdQuery, useGetReviewQuery, useGetRecommendationQuery, useGetImagesQuery, useGetVideosQuery, useGetCreditsQuery, useGetAltTitlesQuery, useGetReleasesQuery, useGetTranslationQuery, useGetSeriesQuery, useGetSeriesByIdQuery } = TmdbApiSlice


const selectData = extendedTmdbApi.endpoints.getMovies.select();

const MMS = createSelector(
    selectData,
    selectdata =>  selectdata.data
)

export const { 
    selectAll: selectAllData,
    selectById: selectDataById,
    selectIds: selectDataIds
} = fetchAdapter.getSelectors(state => MMS(state) ?? initialState)  