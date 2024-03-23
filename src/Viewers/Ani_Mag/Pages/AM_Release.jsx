import React from 'react'
import Struct_Dates from '../../Comps/Struct_Dates'
import Skeletal_Struc from '../../Skeletal_Struc'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { rgbColor } from '../../../app/AppFunctions/colorPicker'
import Types from '../../../Customs/Types'
import { useGetFullAnimeQuery, useGetFullMangaQuery } from '../../../app/Jikan/jikanSlice'
import { useGetReleasesQuery } from '../../../app/Tmdb/TmdbSlice'

const AM_Release = () => {

    let {id} = useParams();

    const type = Types(location.pathname)

    const {
        data: result,
        isFetching,
        isError,
        isLoading,
        error,
        isSuccess
    } = type == "anime" 
    ? useGetFullAnimeQuery(id)
    : type == "manga"
    ? useGetFullMangaQuery(id)
    : type == "movies"
    ? useGetReleasesQuery({id, type: "movie"})
    : useGetReleasesQuery({id, type: "tv"})

  


    if(!isFetching && result && isSuccess && (type == "anime" || type == "manga")) {

        const {entities, ids} = result;
        const dates = type == "anime"
        ?  entities[ids].aired 
        : type == "manga"
        ? entities[id].published
        : type == "movies"
        ? ""
        : ""


        return (
        <>
            <Skeletal_Struc property={dates} type={"Dates"} />
        </>
        )
    }

    console.log(result);

    if(!isFetching && result && isSuccess && (type == "series" || type == "movies")) {

        const {entities, ids} = result;
        const dates = 
        (type == "anime")
        ?  entities[ids].aired 
        : (type == "manga")
        ? entities[id].published
        : (type == "movies")
        ? result?.results != undefined ? result?.results : ""
        : result?.results != undefined? result?.results : ""


        return (
        <>
            <Skeletal_Struc property={dates} type={"Dates"} />
        </>
        )
    }


}

export default AM_Release