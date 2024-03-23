import React from 'react'
import { useGetImagesQuery } from '../../../app/Tmdb/TmdbSlice'
import Types from '../../../Customs/Types'
import { useParams } from 'react-router-dom'
import Skeletal_Struc from '../../Skeletal_Struc'

const AM_Logos = () => {

  const position = Types(location.pathname)
  const { id } = useParams()

  const {
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
    data: result
  } = 
  position == "movies"
  ? useGetImagesQuery({id, type: "movie"})
  : useGetImagesQuery({id, type: "tv"})

  if(!isFetching && isSuccess && result){
    let logosImg = result ? result?.logos : []
    return (
      <Skeletal_Struc property={logosImg} type={"Logos"} />
    )
  }
  
}

export default AM_Logos