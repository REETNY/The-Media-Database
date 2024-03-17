import React from 'react'
import Skeletal_Struc from '../../Skeletal_Struc'
import { useAnimeVideosQuery } from '../../../app/Jikan/jikanSlice'
import { useParams } from 'react-router-dom'
import Types from '../../../Customs/Types'

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
  } = typs == "anime"
  ? useAnimeVideosQuery({id})
  : ""

  let datas = result?.data;

  if(isFetching == false)
  return (
    <>
      <Skeletal_Struc bool={isFetching} property={datas} type={"Videos"} />
    </>
  )
}

export default AM_Videos