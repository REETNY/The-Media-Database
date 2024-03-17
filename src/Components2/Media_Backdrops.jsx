import React from 'react'
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';

import { useAnimePicturesQuery, useMangaPicturesQuery } from '../app/Jikan/jikanSlice';
import useScreenSize from '../Customs/UseScreenSize';
import { useGetImagesQuery } from '../app/Tmdb/TmdbSlice';

const Media_Backdrops = ({id, M_S}) => {

    const [delay, setDelay] = useState(true);

    function type(){
        let url = location.pathname;
        if(url.includes("manga")){
            return "manga"
        }else if(url.includes("anime")){
            return "anime"
        }else if(url.includes("movies")){
            return "movies"
        }else{
            return "tv"
        }
    }


    const size = useScreenSize();

    const {
        data: result,
        isLoading,
        isError,
        isSuccess,
        error
    } = (type() == "manga") 
    ?  useMangaPicturesQuery({id}, {skip: delay})
    : (type() == "anime")
    ? useAnimePicturesQuery({id}, {skip: delay})
    : (type() == "movies")
    ? useGetImagesQuery({id, type: "movie"})
    : useGetImagesQuery({id, type: "tv"})


    useEffect(() => {
        new Promise((resolve, reject) => setTimeout(resolve, 3500)).then(
            () => setDelay(false)
        )
    }, [])

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
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              
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

    const mappedMedia = (isSuccess && (result?.data?.length > 0 || result?.backdrops.length > 0)) 
    ?
        (result?.data || result?.backdrops).slice(0,5).map((item, index) => {
            
            return (
                <div  key={index + 1} style={{width: `${size.width <= 670 ? "calc(100vw - 30px)" : "600px"}`, height: "310px"}} className='item'>
                    <div className="backDrops_items">
                        <div className="drops_item_hero">
                            <img src={item.webp == undefined ?  `https://image.tmdb.org/t/p/w500${item.file_path}` : item.webp.image_url} alt="" className="item_hero_drop" />
                        </div>
                    </div>
                </div>
            )
        })
    : []

  return (
    <>
        
            {(mappedMedia?.length > 0 && isSuccess) 
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
                : (isSuccess && mappedMedia?.length == 0)
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
        
    </>
  )
}

export default Media_Backdrops