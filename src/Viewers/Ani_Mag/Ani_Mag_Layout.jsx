import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import Header2 from '../../Components/Header2'
import { useGetFullAnimeQuery, useGetFullMangaQuery } from '../../app/Jikan/jikanSlice';
import { useParams } from 'react-router-dom'
import { useGetMoviesByIdQuery } from '../../app/Tmdb/TmdbSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getColor } from '../../app/AppFunctions/colorPicker';
import { colorStatus } from '../../app/AppFunctions/colorPicker';
import Types from '../../Customs/Types';

const Ani_Mag_Layout = () => {

  let param = useParams()

  const type = Types(location.pathname)

  const {
    data: result,
    isError,
    isSuccess,
    isLoading
  } = 
  type == "manga"
  ? useGetFullMangaQuery(param.id) 
  : type == "anime" 
  ? useGetFullAnimeQuery(param.id)
  : type == "movies"
  ? useGetMoviesByIdQuery({id: param.id, type: "movie"})
  : type == "series"
  ? ""
  : ""

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