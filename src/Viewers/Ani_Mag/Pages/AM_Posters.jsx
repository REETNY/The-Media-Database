import React from 'react'
import { useGetImagesQuery } from '../../../app/Tmdb/TmdbSlice'
import Types from '../../../Customs/Types'
import { useParams } from 'react-router-dom'
import Skeletal_Struc from "../../Skeletal_Struc"

const AM_Posters = () => {

  const position = Types(location.pathname)

  const {id} = useParams()

  const {
    isLoading,
    isError,
    isFetching,
    isSuccess,
    error,
    data: result
  } =
  position == "movies"
  ? useGetImagesQuery({id, type: "movie"})
  : useGetImagesQuery({id, type: "tv"})

  if(isSuccess && !isFetching && result){
    let posterItem = result ? result?.posters : []
    return (
      <>
        <Skeletal_Struc property={posterItem} type={"Posters"} />
      </>
    )
  }
  
}

export default AM_Posters