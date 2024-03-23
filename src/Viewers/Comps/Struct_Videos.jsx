import React, { useRef, useState } from 'react'
import Types from '../../Customs/Types';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import Nothing from '../../UI_Loading/UI/Nothing';
import NOImage from "../../assets/No_Image.png"

const Struct_Videos = (props) => {
  const typs = Types(location.pathname)
  const videos = props?.property;
  const state = props?.strCo;
  const [vidUrl, setVid] = useState({
    url: "",
    title: "",
    isOn: false
  })

  const IframeCont = useRef(null)
  const Iframe = useRef(null)
  
  let currChoice = typs == "anime" ? videos[state] : videos.filter((item) => item.type == state ? item : false);

  console.log(currChoice);

  let container = [];

  if(currChoice && typs == "anime" && state == "episodes"){
    container = currChoice?.map((item, index) => {
      let img = item.images.jpg.image_url;
      let epis = item.episode;
      let epis_name = item.title;
      let anchor = item.url;

      return(
        <div key={index} className="episodes_vid">
          <div className="epis_hero_cont">
            <img src={img || NOImage} alt={epis_name} />
          </div>
          <div className="epis_details">
            <div className="epis_data">
              <span className="epis_head">Episode Name:</span>
              <span className="epis_content">{epis_name}</span>
            </div>
            <div className="epis_data">
            <span className="epis_head">Episode:</span>
              <span className="epis_content">{epis}</span>
            </div>
            <div className="epis_data">
              <span className="epis_head">More Info:</span>
              <span className="epis_content"><Link to={anchor}>click here</Link></span>
            </div>
          </div>
        </div>
      )
    })
  }else if(currChoice && typs == "anime" && (state == "music_videos")){
    container = currChoice?.map((item, index) => {
      let { title } = item?.meta || item;
      let { embed_url } = item?.video;
      let { image_url } = item?.video.images;

      return(
        <div key={index} className="episodes_vid">
          <div className="epis_hero_cont">
            <img src={image_url || NOImage} alt={title} />
            <span onClick={() => {
              setVid(() => ({url: embed_url, title, isOn: true}))
              addEffect(true)
            }} className="epis_play"><FaPlay /></span>
          </div>
          <div className="epis_details">
            <div className="epis_data">
              <span className="epis_head">Title:</span>
              <span className="epis_content">{title}</span>
            </div>
          </div>
        </div>
      )
    })
  }else if(currChoice && typs == "anime" && (state == "promo")){
    container = currChoice?.map((item, index) => {
      let { title } = item;
      let { embed_url } = item?.trailer;
      let { image_url } = item?.trailer.images;

      return(
        <div key={index} className="episodes_vid">
          <div className="epis_hero_cont">
            <img src={image_url || NOImage} alt={title} />
            <span onClick={() => {
              setVid(() => ({url: embed_url, title, isOn: true}))
              addEffect(true)
            }} className="epis_play"><FaPlay /></span>
          </div>
          <div className="epis_details">
            <div className="epis_data">
              <span className="epis_head">Title:</span>
              <span className="epis_content">{title}</span>
            </div>
          </div>
        </div>
      )
    })
  }

  if(typs == "movies" || typs == "series"){
    container = currChoice?.map((item, index) => {
      let title = item.name;
      let embed_url = `https://www.youtube.com/embed/${item?.key}`;
      let image_url = `http://img.youtube.com/vi/${item?.key}/0.jpg`;
      let type = item.type

      return(
        <div key={index} className="episodes_vid">
          <div className="epis_hero_cont">
            <img src={image_url || NOImage} alt={title} />
            <span onClick={() => {
              setVid(() => ({url: embed_url, title, isOn: true}))
              addEffect(true)
            }} className="epis_play"><FaPlay /></span>
          </div>
          <div className="epis_details">
            <div className="epis_data">
              <span className="epis_head">Title:</span>
              <span className="epis_content">{title}</span>
            </div>
            <div className="epis_data">
              <span className="epis_head">Type:</span>
              <span className="epis_content">{type}</span>
            </div>
          </div>
        </div>
      )
    })
  }

  const addEffect = (bool) => {
    if(bool){
      IframeCont.current.style.backdropFilter = `grayscale(100%)`;
    }else{
      IframeCont.current.style.backdropFilter = `grayscale(0%)`;
    }
    
  }
  
  return (
    <div className='videos_episodes_sector'>
      {container.length > 0 ? container : <Nothing />}
      {
        <>
            <div ref={IframeCont} style={vidUrl.isOn == true ? {display: "flex"} : {display: "none"}} className="trailer_video_abso_wrapper">
                <div className="trailer_wrap_cont">
                    <div className="trailer_wrap_cont_head">
                        <div className="cont_head_text">{vidUrl.title}</div>
                        <div onClick={() => {
                          setVid((obj) => ({...obj, isOn: false, url: "", title: ""}))
                          addEffect(false)
                        }} 
                        className="cont_head_icon"
                        >
                          <span></span>
                          <span></span>
                        </div>
                    </div>
                    <div className="trailer_wrap_cont_player">
                        <iframe key={vidUrl.title} ref={Iframe} allowFullScreen src={vidUrl.url} frameBorder="0"></iframe>
                    </div>
                </div>
            </div>
        </>
      }
    </div>
  )
}

export default Struct_Videos