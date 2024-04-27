import React from 'react'
import Skeletal_Struc from '../../Skeletal_Struc'
import { useAnimePicturesQuery, useMangaPicturesQuery } from '../../../app/Jikan/jikanSlice'
import Types from '../../../Customs/Types'
import { useParams } from 'react-router-dom'
import { useGetImagesQuery } from '../../../app/Tmdb/TmdbSlice'

const AM_Backdrop = () => {

  const {id} = useParams()
  const typs = Types(location.pathname)

  const {
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
    data: result
  } = typs == "anime"
  ? useAnimePicturesQuery({id})
  : typs == "manga"
  ? useMangaPicturesQuery({id})
  : typs == "movies"
  ? useGetImagesQuery({id, type: "movie"})
  : typs == "series"
  ? useGetImagesQuery({id, type: "tv"})
  : ""

  let datas = result?.data


  if((typs == "anime" || typs == "manga") && !isFetching && isSuccess){
    return (
      <>
        <Skeletal_Struc property={datas} type={"Backdrops"} />
      </>
    )
  }

  if((typs == "movies" || typs == "series") && !isFetching && isSuccess){
    let back_images = result?.backdrops == undefined ? ["All"] : result?.backdrops;
    return(
      <>
        <Skeletal_Struc property={back_images} type={"Backdrops"} />
      </>
    )
  }
  
}

export default AM_Backdrop