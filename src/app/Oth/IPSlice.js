import { IPDataApi } from "../../api/IPData";


const initialState = {
    location: "",
}

export const IPDATASLICE = IPDataApi.injectEndpoints({
    endpoints: (builder) => ({
        getLocation: builder.query({
            query: () => ({
                url: `?api-key=${import.meta.env.VITE_IPData}`
            }),
            transformResponse: (res) => {
                let ip = [{...res, id: res.count, elementId: 1}]
                localStorage.setItem("userIP", JSON.stringify(ip))
            }
        }),
        getAllCountries: builder.query({
            query: () => ({
                url: `https://api.countrystatecity.in/v1/countries`,
                headers: {
                    "X-CSCAPI-KEY": `${import.meta.env.VITE_Locate}`
                }
            })
        })
    })
})

export const { useGetLocationQuery, useGetAllCountriesQuery } = IPDATASLICE
