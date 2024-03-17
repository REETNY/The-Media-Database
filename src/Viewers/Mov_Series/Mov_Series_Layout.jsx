import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import Header2 from '../../Components/Header2'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getColor } from '../../app/AppFunctions/colorPicker';
import { colorStatus } from '../../app/AppFunctions/colorPicker';
import { useGetMoviesByIdQuery } from '../../app/Tmdb/TmdbSlice';

const Mov_Series_Layout = () => {

  let param = useParams()

  const type = () => {
      let url = location.pathname;
      if(url.includes("movies")){
        return "movies"
      }else{
        return "series"
      }
  }

  const {
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
    data: result
  } = type() == "movies"
  ? useGetMoviesByIdQuery({id: param.id})
  : ''

  let dispatch = useDispatch()
  let statusWindow = useSelector(colorStatus);

  useEffect(() => {
    if(result == null || result == undefined)return
      dispatch(getColor({id: param.id, imageSrc : `https://image.tmdb.org/t/p/w500${result.backdrop_path}`})).unwrap()
  }, [result])

  if(isSuccess && !isFetching && statusWindow == "fulfilled"){
    return (
      <section>
        <Header2 />
        {result && <Outlet context={result} />}
      </section>
    )
  }
}

export default Mov_Series_Layout