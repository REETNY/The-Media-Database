import React from 'react'
import { FaPlay } from 'react-icons/fa'

const Play_Trailer = (props) => {
  const { func } = props.data;
  return (
    <div onClick={() => func()} className="play_trailer_btn_wrapper">
      <div className="play_trailer_wrap">
        <span className="trailer_wrap_icon">
          <FaPlay />
        </span>
        <span className="trailer_wrap_text">Play Trailer</span>
      </div>
    </div>
  )
}

export default Play_Trailer