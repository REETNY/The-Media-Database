import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

import { useAnimeRecommendationQuery, useMangaRecommendationQuery } from '../app/Jikan/jikanSlice';
import Recom_View from '../Components2/Recom_View';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useGetRecommendationQuery } from '../app/Tmdb/TmdbSlice';
import { useSelector } from 'react-redux';
import { Mv_Tv } from '../app/Oth/FilterSlice1';

const Min_Recom = (props) => {

    const {id, title} = props.data;
    const [delay, setDelay] = useState(true)
    const slider = useRef(null)

    const settings = {
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        className: "sliderItem_Recomm",
        variableWidth: true,
        adaptiveHeight: true,
        beforeChange : (oldIndex, newIndex) => {
            const sliderBtn1 = document.querySelector(".slider_btn_prev");
            const sliderBtn2 = document.querySelector(".slider_btn_next");
            if(newIndex == 0){
                sliderBtn1.style.display = "none"
            }else if(newIndex > 0){
                sliderBtn1.style.display = "flex"
            }else if((newIndex + 2) == (result?.data?.length - 1)){
                sliderBtn2.style.display = "none"
            }else if((newIndex + 2) != (result?.data?.length - 1)){
                sliderBtn2.style.display = "flex"
            }

        },
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
              initialSlide: 1
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

    const type = () => {
        const url = location.pathname;
        if(url.includes("manga")){
            return "manga"
        }else if(url.includes('anime')){
            return "anime"
        }else if(url.includes("movies")){
            return "movies"
        }else{
            return "series"
        }
    }

    const pathProfiler = useSelector(Mv_Tv)

    const {
        data: result,
        isLoading,
        isSuccess,
        isError,
        error
    } = type() == "manga" 
    ?  useMangaRecommendationQuery({id}, {skip: delay}) 
    : type() == "anime"
    ? useAnimeRecommendationQuery({id}, {skip: delay})
    : type() == "movies"
    ? useGetRecommendationQuery({id, type: 'movie'})
    : useGetRecommendationQuery({id, type: "tv"})


    const mappedData = (isSuccess && (result?.data?.length > 0 || result?.results.length > 0)) 
        ? 
        (result?.data || result.results)?.map((item, index) => {
        const {entry, votes, backdrop_path, id, title, vote_average } = item;
        return (
            <Recom_View key={index + 1} data={{entry, votes, index, backdrop_path, id, title, vote_average}} />
        )
        }) 
        : 
        (isSuccess && (result?.data?.length == 0 || result?.results?.length == 0))
        ? 
            <div className="error_noDataMsg" style={{marginBottom: '25px'}}>
                <i>We don't have enough data to suggest any {type()} based on {title}</i>
            </div>
    : ""

    const alpha = Array.from(Array(7)).map((e, i) => i + 65);
    const alphabet = [...alpha.map((x) => String.fromCharCode(x))];

    const LoadingSkeleton = alphabet.map((item, index) => {
        return(
            <div key={index * 2} className="recomm_skeleton">
                <div className="recomm_skeleton_hero">
                    <Skeleton height={"100%"} width={"100%"} duration={2} />
                </div>
                <div className="recomm_skeleton_details">
                    <Skeleton height={"40%"} width={"100%"} duration={2} />
                    <Skeleton height={"40%"} width={"100%"} duration={2} />
                </div>
            </div>
        )
    })


    useEffect(() => {
        new Promise((resolve, reject) => setTimeout(resolve, 5500)).then(
            () => setDelay(false)
        )
    }, [])

    if(isSuccess && (result?.data?.length > 0 || result?.results?.length > 0)){
        return (
            <div className="recomm_cont_wrapper">
                <div className="forEach_recomm_wrap">
                    <div className="recomm_data_slider">
                        <Slider ref={slider} {...settings}>
                            {mappedData && mappedData}
                        </Slider>
                        <div onClick={() => slider.current.slickPrev(500)} className="slider_btn_prev"><FaLongArrowAltLeft /></div>
                        <div onClick={() => slider.current.slickNext(500)} className="slider_btn_next"><FaLongArrowAltRight /></div>
                    </div>
                </div>
            </div>
        )
    }

    if(isSuccess && (result?.data?.length == 0 || result?.results?.length == 0)){
        return (
            <div className="recomm_cont_wrapper">
                <div className="forEach_recomm_wrap">
                    <div className="recomm_data_slider">
                        {mappedData}
                    </div>
                </div>
            </div>
        )
    }

    if(isLoading){
        <div className="recomm_cont_wrapper">
            <div className="forEach_recomm_wrap">
                <div className="recomm_wrap_load">
                    {LoadingSkeleton}
                </div>
            </div>
        </div>
    }

    if(isError){
        <div className="error_noDataMsg" style={{marginBottom: '25px'}}>
            <i>{error.data.message || error.message}</i>
        </div>
    }

    return (
        <div className="recomm_cont_wrapper">
            <div className="forEach_recomm_wrap">
                <div className="recomm_wrap_load">
                    {LoadingSkeleton}
                </div>
            </div>
        </div>
    )
  
}

export default Min_Recom