import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { useAnimeVideosQuery } from '../app/Jikan/jikanSlice'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';


import { FaPlay } from "react-icons/fa";
import useScreenSize from '../Customs/UseScreenSize';
import { useGetVideosQuery } from '../app/Tmdb/TmdbSlice';

const Media_Videos = ({id, M_S}) => {

    const [delay, setDelay] = useState(true);
    const [isOn, setIsOn] = useState(false)

    const vidUrl = useRef("")
    const vidTitl = useRef("")
    const Iframe = useRef(null);

    function type(){
        let url = location.pathname;
        if(url.includes("anime")){
            return "anime"
        }else if(url.includes("movies")){
            return "movies"
        }else if(url.includes("tv")){
            return "tv"
        }
    }

    useEffect(() => {
        new Promise((resolve, reject) => setTimeout(resolve, 3500)).then(
            () => setDelay(false)
        )
    }, [])

    const {
        data: result,
        isLoading,
        isError,
        isSuccess,
        error
    } = (type() == "anime") 
    ?  useAnimeVideosQuery({id}, {skip: delay})
    : type() == "movies"
    ? useGetVideosQuery({id, type: "movie"})
    : type() == "tv"
    ? useGetVideosQuery({id, type: "tv"})
    : ""

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
        arrows: true,
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

    const setUrl = (url, titl) => {
        vidUrl.current = url
        vidTitl.current = titl
    }

    const setPlay = () => {
        // setDelay(true);
        setIsOn(() => true)
    }

    const screen = useScreenSize()

    let mappedMedia = []

    if(type() == "anime"){
        mappedMedia = (isSuccess && result?.data) && result?.data?.music_videos?.slice(0,5)?.map((item, index) => {
            let image = item?.video?.images?.image_url;
            return (
                <div key={index + 1} style={{width: `${screen.width <= 670 ? "calc(100vw - 20px)" : "450px"}`}} className='item'>
                    <div className="mediaVid_items">
                        <div className="medVid_item_click">
                            <div className="imgVidLoad">
                                {
                                    <img src={image} alt={item.meta.title} />
                                }
                            </div>
                            <div className="openMedVid">
                                <span onClick={() => {
                                    vidUrl.current = ""
                                    setUrl(item?.video?.embed_url, item?.meta?.title)
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
        })
    }

    if(type() == "movies" || type() == "tv"){
        mappedMedia = (isSuccess && result?.results) && result?.results?.slice(0,5)?.map((item, index) => {
            if(item.key == null || item.site != "YouTube"){
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
    }


    return (
        <>
        
            {(mappedMedia.length > 0 && isSuccess) 
                ?
                    <div className="mediaSliderCont">
                        <Slider {...settings}>
                            {
                                mappedMedia
                            }
                        </Slider>
                    </div>
                    
                : (isError)
                ? 
                    <div className="error_noDataMsg" style={{marginBottom: '25px'}}>
                        <i>Error kindly reload page again</i>
                    </div>
                :   (isLoading)
                ? 
                    <div className="mediaSliderCont">
                        <div className="loading_media_skeleton">
                            <div className={`loading_skeleton_${M_S.choice}`}>
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
                : (isSuccess && mappedMedia.length == 0)
                ?
                    <div className="error_noDataMsg" style={{marginBottom: '25px'}}>
                        <i>Nothing to show in here</i>
                    </div>
                :
                <div className="mediaSliderCont">
                    <div className="loading_media_skeleton">
                        <div className={`loading_skeleton_${M_S.choice}`}>
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

export default Media_Videos