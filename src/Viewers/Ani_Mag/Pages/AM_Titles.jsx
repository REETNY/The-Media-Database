import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetFullAnimeQuery, useGetFullMangaQuery } from '../../../app/Jikan/jikanSlice';
import Types from '../../../Customs/Types';
import Skeletal_Struc from '../../Skeletal_Struc';
import { useGetAltTitlesQuery } from '../../../app/Tmdb/TmdbSlice';

const AM_Titles = () => {

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
  ? useGetAltTitlesQuery({id, type: "movie"})
  : useGetAltTitlesQuery({id, type: "tv"})

  if(!isFetching && result && isSuccess && (type == "anime" || type == "manga")){

    const {entities, ids} = result;
    const titles = entities[ids].titles;

    return (
      <>
        <Skeletal_Struc property={titles} type={"Titles"} />
      </>
    )
  }else if(!isFetching && (type == "movies" || type == "series")){
    const titles = result.titles
    return (
      <>
        <Skeletal_Struc property={titles} type={"Titles"} />
      </>
    )
  }
  
}

export default AM_Titles