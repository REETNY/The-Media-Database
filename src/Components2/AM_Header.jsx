import React, { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Types from '../Customs/Types'
import { useGetMoviesByIdQuery } from '../app/Tmdb/TmdbSlice'

const AM_Header = ({bgClr}) => {
  const types = Types(location.pathname)
  const {id} = useParams()
  const {entities} = useOutletContext()
  const {title, aired, images, published} = (types == "anime" || types == "manga") ? entities[id] : []

  const format = () => {
    return new Date(type() == "anime" ? aired?.from : published?.from).getFullYear()
  }

  const format2 = (proper) => {
    return new Date(proper).getFullYear()
  }

  const type = () => {
    let y = location.pathname;
    if(y.includes("anime")){
      return "anime"
    }else{
      return "manga"
    }
  }

  const {
    isFetching,
    isLoading,
    data: res,
    isError,
    error
  } = types == "movies" 
  ? useGetMoviesByIdQuery({id, type: "movie"})
  : types == "series"
  ? useGetMoviesByIdQuery({id, type: "tv"})
  : ""

  const locate = location.pathname;

  console.log();
  
  if(types == "anime" || types == "manga"){
    return (
      <div style={{background: `rgb(${bgClr})`}} className="innerHeader_el">
        <div className="hero_head_img">
          <img src={images.webp.image_url} alt={title} />
        </div>
        <div className="dets_head">
          <div className="dets_head_title">
            <div className="HDT">{title}</div>
            <div className="HDY">({format()})</div>
          </div>
          <Link to={
            locate.includes("none") 
            ? "../.."
            : locate.includes("images")
            ? "../.."
            : ".."
          }>Back to main</Link>
        </div>
      </div>
    )
  }

  if((types == "movies" || types == "series") && !isFetching){
    return (
      <div style={{background: `rgb(${bgClr})`}} className="innerHeader_el">
        <div className="hero_head_img">
          <img src={`https://image.tmdb.org/t/p/w500/${res?.poster_path}`} alt={res?.title} />
        </div>
        <div className="dets_head">
          <div className="dets_head_title">
            <div className="HDT">{res?.title}</div>
            <div className="HDY">({format2(res?.release_date)})</div>
          </div>
          <Link to={
            locate.includes("none") 
            ? "../.."
            : locate.includes("images")
            ? "../.."
            : ".."
          }>Back to main</Link>
        </div>
      </div>
    )
  }
}


export default AM_Header