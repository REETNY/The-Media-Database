import React from 'react'
import Skeletal_Struc from '../../Skeletal_Struc'
import { useAnimeVideosQuery } from '../../../app/Jikan/jikanSlice'
import { useParams } from 'react-router-dom'
import Types from '../../../Customs/Types'
import { useGetVideosQuery } from '../../../app/Tmdb/TmdbSlice'

const AM_Videos = () => {

  const {id} = useParams()

  const typs = Types(location.pathname)

  const {
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
    data: result
  } = 
  typs == "anime"
  ? useAnimeVideosQuery({id})
  : typs == "movies"
  ? useGetVideosQuery({id, type: "movie"})
  : typs == "series"
  ? useGetVideosQuery({id, type: "tv"})
  : ""

  if(isFetching == false && isSuccess && result && (typs == "anime")){
    let datas = result?.data;
    return (
      <>
        <Skeletal_Struc bool={isFetching} property={datas} type={"Videos"} />
      </>
    )
  }

  if(isFetching == false && isSuccess && result && (typs == "movies" || typs == "series")){
    let datas = result?.results;
    return (
      <>
        <Skeletal_Struc bool={isFetching} property={datas} type={"Videos"} />
      </>
    )
  }

  return ""
  
}

export default AM_Videos