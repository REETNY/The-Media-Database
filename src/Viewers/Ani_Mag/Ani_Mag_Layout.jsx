import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import Header2 from '../../Components/Header2'
import { useGetFullAnimeQuery, useGetFullMangaQuery } from '../../app/Jikan/jikanSlice';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getColor } from '../../app/AppFunctions/colorPicker';
import { colorStatus } from '../../app/AppFunctions/colorPicker';

const Ani_Mag_Layout = () => {

  let param = useParams()

  const type = () => {
    let url = location.pathname;
    if(url.includes("manga")){
      return "manga"
    }else{
      return "anime"
    }
  }

  const {
    data: result,
    isError,
    isSuccess,
    isLoading
  } = type() == "manga" ? useGetFullMangaQuery(param.id) : useGetFullAnimeQuery(param.id)

  let dispatch = useDispatch()
  let statusWindow = useSelector(colorStatus)

  let {entities} = isSuccess && result;

  // entities[param.id].images.jpg != undefined && dispatch(pickColor({id: param.id, imageSrc : entities[param.id].images.jpg.image_url}))

  useEffect(() => {
    if(result?.ids?.length <= 0 || result == undefined)return
      dispatch(getColor({id: param.id, imageSrc : entities[param.id].images.jpg.image_url})).unwrap()
  }, [result])

  if(isSuccess && statusWindow == "fulfilled"){
    return (
      <section>
        <Header2 />
        {result && <Outlet context={result} />}
      </section>
    )
  }
  
}

export default Ani_Mag_Layout