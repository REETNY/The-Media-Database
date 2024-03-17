import React from 'react'
import Skeletal_Struc from '../../Skeletal_Struc'
import { useAnimePicturesQuery, useMangaPicturesQuery } from '../../../app/Jikan/jikanSlice'
import Types from '../../../Customs/Types'
import { useParams } from 'react-router-dom'

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
  : ""

  let datas = result?.data

  console.log(datas);

  return (
    <>
      <Skeletal_Struc property={datas} type={"BackDrops"} />
    </>
  )
}

export default AM_Backdrop