import React from 'react'
import { useGetTranslationQuery } from '../../../app/Tmdb/TmdbSlice'
import Types from '../../../Customs/Types'
import { useParams } from 'react-router-dom'
import Skeletal_Struc from '../../Skeletal_Struc'

const Translation = () => {
  let {id} = useParams()

  const typs = Types(location.pathname);

  const {
      data: result,
      isLoading,
      isFetching,
      isSuccess,
      isError,
      error
  } = (typs == "movies")
  ? useGetTranslationQuery({id, type: "movie"})
  : useGetTranslationQuery({id, type: "movie"})

  if(!isFetching && isSuccess && result?.translations){
    let translate = result?.translations != undefined ? result?.translations : [];
    return (
      <>
        <Skeletal_Struc property={translate} type={"Translation"} />
      </>
    )
  }
}

export default Translation