import React, { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'

const AM_Header = ({bgClr}) => {
  const {id} = useParams()
  const {entities} = useOutletContext()
  const {title, aired, images, published} = entities[id]

  const format = () => {
    return new Date(type() == "anime" ? aired?.from : published?.from).getFullYear()
  }

  const type = () => {
    let y = location.pathname;
    if(y.includes("anime")){
      return "anime"
    }else{
      return "manga"
    }
  }

  const locate = location.pathname;
  
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


export default AM_Header