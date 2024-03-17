import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetFullAnimeQuery, useGetFullMangaQuery } from '../../../app/Jikan/jikanSlice';
import Types from '../../../Customs/Types';
import Skeletal_Struc from '../../Skeletal_Struc';

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
  ? ""
  : ''

  


  if(!isFetching && result && isSuccess){

    const {entities, ids} = result;
    const titles = entities[ids].titles;

    return (
      <>
        <Skeletal_Struc property={titles} type={"Titles"} />
      </>
    )
  }
  
}

export default AM_Titles