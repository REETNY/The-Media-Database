import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';



import Media_Backdrops from '../Components2/Media_Backdrops';
import Media_Videos from '../Components2/Media_Videos';
import Media_Posters from '../Components2/Media_Posters';
import Media_Popular from '../Components2/Media_Popular';


const Min_Media = (props) => {

    const {id} = props.data;

    const [M_S, setM_S] = useState({
        choice: type() == "manga" ? "backdrops" : "popular"
    })

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
    
    function type(){
        let url = location.pathname;
        if(url.includes("manga")){
            return "manga"
        }else if(url.includes("anime")){
            return "anime"
        }else if (url.includes("movies")){
          return "movies"
        }else{
          return "tv"
        }
    }

    const makeChoice = ({type}) => {
        setM_S((obj) => ({...obj, choice: type}))
    }

  return (
    <div className="forMin_Media_Comp">

        <div className="min_media_header">
            <div className="min_media_head_text">Media</div>
            <div className="min_media_nav_list">
                <ul className="nav_list_media">
                    {type() != "manga" && <li className={M_S.choice == "popular" ? "li_media open" : "li_media"} onClick={() => makeChoice({type: "popular"})}>Popular</li>}
                    {type() != "manga" && <li className={M_S.choice == "videos" ? "li_media open" : "li_media"} onClick={() => makeChoice({type: "videos"})}>Videos</li>}
                    <li className={M_S.choice == "backdrops" ? "li_media open" : "li_media"} onClick={() => makeChoice({type: "backdrops"})}>BackDrops</li>
                    {(type() != "manga" && type() != "anime") && <li className={M_S.choice == "posters" ? "li_media open" : "li_media"} onClick={() => makeChoice({type: "posters"})}>Posters</li>}
                </ul>
            </div>
            {M_S.choice != "popular" && <div className="to_current_media_data">
                <Link >View All {M_S.choice.charAt(0).toUpperCase()+M_S.choice.slice(1, M_S.choice.length)}</Link>
            </div>}
        </div>


        <div className="min_media_cont_view">
            <div className="min_cont_view_wrap">
                <div className="for_back_post_pop_vid_wrap">
                    {
                        M_S.choice == "backdrops"
                        ? <Media_Backdrops id={id} M_S={M_S} />
                        : M_S.choice == "videos"
                        ? <Media_Videos id={id} M_S={M_S} />
                        : M_S.choice == "popular"
                        ? <Media_Popular id={id} M_S={"backdrops"} /> 
                        : M_S.choice == "posters"
                        ? <Media_Posters id={id} M_S={M_S} />
                        : "Nothing To Show In Here!"
                    }
                </div>
            </div>
        </div>

    </div>
  )


}

export default Min_Media