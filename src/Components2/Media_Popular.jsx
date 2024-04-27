import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';
import { useGetVideosQuery, useGetImagesQuery } from '../app/Tmdb/TmdbSlice'
import { useAnimeVideosQuery, useMangaPicturesQuery, useAnimePicturesQuery } from "../app/Jikan/jikanSlice"
import useScreenSize from '../Customs/UseScreenSize';
import { FaPlay } from 'react-icons/fa';

const Media_Popular = ({id, M_S}) => {
  const [reset, setRR] = useState(true)

  function type(){
    let url = location.pathname;
    if(url.includes("movie")){
      return "movies"
    }else if(url.includes("tv")){
      return "tv"
    }else if(url.includes("anime")){
      return "anime"
    }else if(url.includes("manga")){
      return "manga"
    }
  }

  useEffect(() => {
    new Promise((resolve, reject) => setTimeout(resolve, 13500)).then(
        () => setRR(false)
    )
}, [])

  const [isOn, setIsOn] = useState(false)

  let vidUrl = useRef(null)
  let vidTitl = useRef(null)
  const Iframe = useRef(null);
  
  const size = useScreenSize();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    initialSlide: 0,
    easing: "linear",
    draggable: true,
    className: M_S.choice == "posters" ? "sliderItem_Media_Post" : "sliderItem_Media",
    variableWidth: true,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToScroll: 1,
          infinite: true,
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToScroll: 1
        }
      }
    ]
  }

  const {
    isLoading: isLoad,
    isFetching: isFetch,
    isSuccess: isSucceed,
    isError: isFail,
    error: failData,
    data: result2
  } = 
  type() == "movies"
  ? useGetImagesQuery({id, type: "movie"})
  : type() == "tv"
  ? useGetImagesQuery({id, type: "tv"})
  : ""

  const {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    data: result
  } = 
  type() == "movies"
  ? useGetVideosQuery({id, type: "movie"})
  : type() == "tv"
  ? useGetVideosQuery({id, type: "tv"})
  : ""


  const {
    isLoading: AMLOAD,
    isError: AMERR,
    isFetching: AMFETCH,
    isSuccess: AMSUCCESS,
    error: AMERRDATA,
    data: AMDATA1
  } = 
  type() == "anime"
  ? useAnimePicturesQuery({id}, {skip: reset})
  : type() == "manga"
  ? useMangaPicturesQuery({id}, {skip: reset})
  : ''

  const {
    isLoading: AMLOAD2,
    isError: AMERR2,
    isFetching: AMFETCH2,
    isSuccess: AMSUCCESS2,
    error: AMERRDATA2,
    data: AMDATA2
  } = 
  type() == "anime"
  ? useAnimeVideosQuery({id}, {skip: reset})
  : ''

  console.log(result, result2);

  let popVid = []
  let popBack = []
  let popPost = []

  const setUrl = (url, titl) => {
    vidUrl.current = url
    vidTitl.current = titl
  }

  const setPlay = () => {
      // setDelay(true);
      setIsOn(() => true)
  }


  let mappedMedia = []

  if(isSucceed && isSuccess && result && result2 && !isFetching && !isFetch && (type() == "movies" || type() == "tv")){
    popVid = [...popVid, result?.results[0]]
    popBack = [...popBack, result2?.backdrops[0]]
    popPost = [...popPost, result2?.posters[0]]

    mappedMedia = popVid.length > 0 && popVid.map((item, index) => {
      if(item?.key == null || item.site != "YouTube"){
        return
      }else{
          return (
              <div key={index + 1} style={{width: `${screen.width <= 670 ? "calc(100vw - 20px)" : "450px"}`}} className='item'>
                  <div className="mediaVid_items">
                      <div className="medVid_item_click">
                          <div className="imgVidLoad">
                              {
                              <img src={`http://img.youtube.com/vi/${item?.key}/0.jpg`} alt={item?.name} />
                              }
                          </div>
                          <div className="openMedVid">
                              <span onClick={() => {
                                  vidUrl.current = ""
                                  setUrl(`https://www.youtube.com/embed/${item?.key}`, item?.name)
                                  setPlay()
                              }}>
                                  <FaPlay />
                              </span>

                              <div className="animate1">
                                  <span></span><span></span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )
      }
    })

    mappedMedia = [...mappedMedia, ...popBack.map((item, index) => {
      return (
        <div  key={index + 1} style={{width: `${size.width <= 1000 ? "calc(100vw - 30px)" : "600px"}`, height: "310px"}} className='item'>
            <div className="backDrops_items">
                <div className="drops_item_hero">
                    <img src={item.webp == undefined ?  `https://image.tmdb.org/t/p/w500${item.file_path}` : item.webp.image_url} alt="" className="item_hero_drop" />
                </div>
            </div>
        </div>
      )
    })]

    mappedMedia = [...mappedMedia, ...popPost.map((item, index) => {
      return (
        <div  key={index + 1} style={{width: `${size.width <= 670 ? "calc(100vw - 30px)" : "320px"}`, height: "310px"}} className='item'>
            <div className="backDrops_items">
                <div className="drops_item_hero">
                    <img src={item.webp == undefined ?  `https://image.tmdb.org/t/p/w500${item.file_path}` : item.webp.image_url} alt="" className="item_hero_drop" />
                </div>
            </div>
        </div>
      )
    })]

    
  }

  if(AMSUCCESS && AMSUCCESS2 && AMDATA1 && AMDATA2 && !AMFETCH && !AMFETCH2 && (type() == "anime")){
    popVid = [...popVid, 
      AMDATA2?.data?.promo.length > 0 
      ? AMDATA2?.data?.promo[0] 
      : AMDATA2?.data?.music_videos.length > 0
      ? AMDATA2?.data?.music_videos[0]
      : []
    ]

    popBack = [...popBack, ...AMDATA1?.data?.slice(0,2)]

    console.log(popBack, popVid);

    mappedMedia = popVid.length > 0 && popVid.map((item, index) => {
      let title = item?.title || item?.title;
      let vidEmb = item?.trailer?.embed_url || item?.video?.embed_url
      let vidImg  = item?.trailer?.youtube_id || item?.video?.youtube_id
      if(vidEmb && title){
          return (
              <div key={index + 1} style={{width: `${screen.width <= 670 ? "calc(100vw - 20px)" : "450px"}`}} className='item'>
                  <div className="mediaVid_items">
                      <div className="medVid_item_click">
                          <div className="imgVidLoad">
                              {
                              <img src={`http://img.youtube.com/vi/${vidImg}/0.jpg`} alt={title} />
                              }
                          </div>
                          <div className="openMedVid">
                              <span onClick={() => {
                                  vidUrl.current = ""
                                  setUrl(`${vidEmb}`, title)
                                  setPlay()
                              }}>
                                  <FaPlay />
                              </span>

                              <div className="animate1">
                                  <span></span><span></span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )
      }
    })

    mappedMedia = [...mappedMedia, ...popBack.map((item, index) => {
      let filePath = item?.jpg?.image_url
      return (
        <div  key={index + 1} style={{width: `${size.width <= 1000 ? "calc(100vw - 30px)" : "600px"}`, height: "310px"}} className='item'>
            <div className="backDrops_items">
                <div className="drops_item_hero">
                    <img src={filePath} alt="" className="item_hero_drop" />
                </div>
            </div>
        </div>
      )
    })]

  }

  if(type() == "movies" || type() == "tv"){
    return(
      <>
        {(mappedMedia.length > 0 && isSuccess && isSucceed && result && result2 && !isFetching && !isFetch) 
          ?
            <div className="mediaSliderCont">
              <Slider {...settings}>
                {
                  mappedMedia
                }
              </Slider>
            </div>
              
          : (isError || isFail)
          ? 
            <div className="error_noDataMsg" style={{marginBottom: '25px'}}>
              <i>Error kindly reload page again</i>
            </div>
          : (isLoading || isLoad)
            ? 
              <div className="mediaSliderCont">
                <div className="loading_media_skeleton">
                  <div className={`loading_skeleton_${M_S}`}>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                  </div>
                </div>
              </div>
            : (isSuccess && isSucceed && mappedMedia.length == 0)
              ?
                <div className="error_noDataMsg" style={{marginBottom: '25px'}}>
                    <i>Nothing to show in here</i>
                </div>
              :
              <div className="mediaSliderCont">
                  <div className="loading_media_skeleton">
                      <div className={`loading_skeleton_${M_S}`}>
                          <span><Skeleton width={"550px"} height={"100%"} duration={2} /></span>
                          <span><Skeleton width={"480px"} height={"100%"} duration={2} /></span>
                          <span><Skeleton width={"3690px"} height={"100%"} duration={2} /></span>
                          <span><Skeleton width={"300px"} height={"100%"} duration={2} /></span>
                      </div>
                  </div>
              </div>
          }
  
          {
            <>
              <div style={isOn == true ? {display: "flex"} : {display: "none"}} className="trailer_video_abso_wrapper">
                  <div className="trailer_wrap_cont">
                      <div className="trailer_wrap_cont_head">
                          <div className="cont_head_text">{vidTitl.current}</div>
                          <div onClick={() => {
                              setIsOn(() => false)
                              vidUrl.current = ""
                          }} 
                          className="cont_head_icon"
                          >
                              <span></span>
                              <span></span>
                          </div>
                      </div>
                      <div className="trailer_wrap_cont_player">
                          <iframe ref={Iframe} allowFullScreen src={vidUrl.current} frameBorder="0"></iframe>
                      </div>
                  </div>
              </div>
            </>
          }
      </>
    )
  }

  if(type() == "anime"){
    return(
      <>
        {(mappedMedia.length > 0 && AMSUCCESS && AMSUCCESS2 && AMDATA1 && AMDATA2 && !AMFETCH && !AMFETCH2) 
          ?
            <div className="mediaSliderCont">
              <Slider {...settings}>
                {
                  mappedMedia
                }
              </Slider>
            </div>
              
          : (AMERR || AMERR2)
          ? 
            <div className="error_noDataMsg" style={{marginBottom: '25px'}}>
              <i>Error kindly reload page again</i>
            </div>
          : (AMLOAD || AMLOAD2)
            ? 
              <div className="mediaSliderCont">
                <div className="loading_media_skeleton">
                  <div className={`loading_skeleton_${M_S}`}>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                    <span><Skeleton width={"460px"} height={"100%"} duration={2} /></span>
                  </div>
                </div>
              </div>
            : (AMSUCCESS && AMSUCCESS2 && mappedMedia.length == 0)
              ?
                <div className="error_noDataMsg" style={{marginBottom: '25px'}}>
                    <i>Nothing to show in here</i>
                </div>
              :
              <div className="mediaSliderCont">
                  <div className="loading_media_skeleton">
                      <div className={`loading_skeleton_${M_S}`}>
                          <span><Skeleton width={"550px"} height={"100%"} duration={2} /></span>
                          <span><Skeleton width={"480px"} height={"100%"} duration={2} /></span>
                          <span><Skeleton width={"3690px"} height={"100%"} duration={2} /></span>
                          <span><Skeleton width={"300px"} height={"100%"} duration={2} /></span>
                      </div>
                  </div>
              </div>
          }
  
          {
            <>
              <div style={isOn == true ? {display: "flex"} : {display: "none"}} className="trailer_video_abso_wrapper">
                  <div className="trailer_wrap_cont">
                      <div className="trailer_wrap_cont_head">
                          <div className="cont_head_text">{vidTitl.current}</div>
                          <div onClick={() => {
                              setIsOn(() => false)
                              vidUrl.current = ""
                          }} 
                          className="cont_head_icon"
                          >
                              <span></span>
                              <span></span>
                          </div>
                      </div>
                      <div className="trailer_wrap_cont_player">
                          <iframe ref={Iframe} allowFullScreen src={vidUrl.current} frameBorder="0"></iframe>
                      </div>
                  </div>
              </div>
            </>
          }
      </>
    )
  }
}

export default Media_Popular