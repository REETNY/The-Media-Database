import React, {useRef, useEffect, useState} from 'react'
import { useAnimeCastQuery, useMangaCastQuery } from '../app/Jikan/jikanSlice'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Test from "../../src/assets/FormImgs/FormLogo1.webp"
import { useGetCreditsQuery } from '../app/Tmdb/TmdbSlice';
import { useParams } from 'react-router-dom';

const Min_Casts = (props) => {
 
 const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 2000,
    easing: "linear",
    variableWidth: true,
    arrows: false,
    draggable: true,
    className: "carolItem",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const {id} = props.data

  const tmId = useParams()

  const type = () => {
    let url = location.pathname;
    if(url.includes("manga")){
      return "Manga"
    }else if(url.includes("anime")){
      return "Anime"
    }else if(url.includes("movies")){
        return 'Movies'
    }else{
        return "Series"
    }
  }

  const {
    data: result,
    isSuccess,
    isFetching,
    isError,
    isLoading,
    error
  } = type() == "Manga" 
  ? useMangaCastQuery({id})
  : type() == "Anime"
  ? useAnimeCastQuery({id})
  : type() == "Movies"
  ? useGetCreditsQuery({id: tmId.id, type: "movie"})
  : useGetCreditsQuery({id: tmId.id, type: "tv"})
    
  console.log(result);

  if(isSuccess && (result?.data || result?.cast) ){
    const ren = 
      (type() == "Anime" || type() == "Manga") ?
      result?.data?.slice(0, 15)?.map((item, index) => {
        const {mal_id, images, name, url} = item.character;
        const {role} = item
        return (
          <div key={index}>
            <div className="slideItem">
              <div className="slideHero">
                <img src={images.webp.image_url} alt="" />
              </div>
              <div className="slideInfo">
                <div className="slideInfo_name">{name}</div>
                <div className="slideInfo_role">{role}</div>
              </div>
            </div>
          </div>
        )
        })
      : result?.cast?.slice(0, 15)?.map((item, index) => {
        return (
          <div key={index}>
            <div className="slideItem">
              <div className="slideHero">
                <img src={`https://image.tmdb.org/t/p/w500${item?.profile_path}`} alt={item?.name} />
              </div>
              <div className="slideInfo">
                <div className="slideInfo_name">{item?.name}</div>
                <div className="slideInfo_role">{item?.character}</div>
              </div>
            </div>
          </div>
        )
      })

    console.log(ren);

    return(
      <>
        <Slider {...settings}>
          {ren || ""}
        </Slider>
      </>
    )
  }

  if(isSuccess && (!result.data || !result.cast)){
    return(
      <>
        <div className="error_noDataMsg" style={{marginBottom: '25px'}}>
           <i>Nothing to show in here</i>
        </div>
      </>
    )
  }
}

export default Min_Casts