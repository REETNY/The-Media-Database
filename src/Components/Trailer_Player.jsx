import React, { useRef } from 'react'
import { useAnimeVideosQuery } from '../app/Jikan/jikanSlice';
import VideoPlayer from '../Components2/VideoPlayer';
import { useState } from 'react';
import { useGetVideosQuery } from '../app/Tmdb/TmdbSlice';
import { map } from 'jquery';

const Trailer_Player = (props) => {
    const [isFullScreen, setFullScreen] = useState(false);
    const { func, isOn, id, type } = props.data;

    let vidUrl = useRef([])

    const {
        data: result,
        isLoading,
        isError,
        isSuccess,
        isFetching,
        error
    } = (type == "anime" ) 
    ? useAnimeVideosQuery({id})
    : (type == "movies" )
    ? useGetVideosQuery({id, type: "movie"})
    : (type == "tv" )
    ? useGetVideosQuery({id, type: "tv"})
    : ""

    console.log(isOn, vidUrl.current, result);

    if(type == "anime" && isSuccess && vidUrl.current.length == 0){
        const promo = result?.data?.promo;
        const music_vid = result?.data?.music_videos;
        
        console.log("refreshed");

        const filtered = 
        promo.length > 0 ? promo?.map(({trailer}, index) => {
            if(!trailer.embed_url)return
            return trailer.embed_url
        })
        :
        music_vid?.map((item) => {
            return item?.video?.embed_url
        })

        vidUrl.current = [...filtered?.slice(0,4)];

    }else if((type == "movies" || type == "tv") && isSuccess && vidUrl.current.length == 0){

        console.log("refreshed");

        const filtered = result?.results?.filter((item) => item?.type == "Trailer" ? item : false)
        let keys = filtered?.map((item) => item.key);
        // 
        let url = keys.map((item) => `https://www.youtube.com/embed/${item}`)
        vidUrl.current = [...url?.slice(0,4)];
    }

    const fullStyles = {
        minWidth: "100vw",
        minHeight: "100vh",
        overflow: "hidden",
        widdth: "100vw",
        height: "100vh",
    }

    const fullSc = (elem) => {
        setFullScreen((bool) => !bool);
        if(!isFullScreen){
            if(elem.requestFullscreen){
                elem.requestFullscreen()
            }else if(elem.webkitRequestFullscreen){
                elem.webkitRequestFullscreen()
            }else if(elem.msRequestFullscreen){
                elem.msRequestFullscreen()
            }
        }else if(isFullScreen){
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
    }


//    if(isSuccess && result && vidUrl.current.length > 0 && !isLoading){
//         return(
//             <div style={isOn ? {display: "flex"} : {display: "none"}} className="trailer_video_abso_wrapper">
//                 <div className="trailer_wrap_cont">
//                     <div className="trailer_wrap_cont_head">
//                         <div className="cont_head_text">Play Trailer</div>
//                         <div onClick={() => {
//                             func()
//                             // setFullScreen(false)    
//                         }} 
//                         className="cont_head_icon"
//                         >
//                             <span></span>
//                             <span></span>
//                         </div>
//                     </div>
//                     <div className="trailer_wrap_cont_player">
//                         {
//                         (isSuccess && vidUrl.length != 0) 
//                         ? <iframe key={Math.floor(Math.random() * 1000)} src={(vidUrl.current != undefined || vidUrl.current.length != 0) && vidUrl.current[0]} frameBorder="0" allowFullScreen></iframe>
//                         :  isOn && "" //<VideoPlayer screen={isFullScreen} setScreen={fullSc} />
//                         }
//                     </div>
//                 </div>
//             </div>
//         )
//    }else if(isError){

//    }else if(isLoading){
//     return(
//         <div style={isOn ? {display: "flex"} : {display: "none"}} className="trailer_video_abso_wrapper">
//             <div className="trailer_wrap_cont">
//                 <div className="trailer_wrap_cont_head">
//                     <div className="cont_head_text">Play Trailer</div>
//                     <div onClick={() => {
//                         func()
//                         // setFullScreen(false)    
//                     }} 
//                     className="cont_head_icon"
//                     >
//                         <span></span>
//                         <span></span>
//                     </div>
//                 </div>
//                 <div className="trailer_wrap_cont_player">
//                     {
//                         ""
//                     }
//                 </div>
//             </div>
//         </div>
//     )
//    }

    if(isSuccess){
        return(
            <div style={isOn ? {display: "flex"} : {display: "none"}} className="trailer_video_abso_wrapper">
                <div className="trailer_wrap_cont">
                    <div className="trailer_wrap_cont_head">
                        <div className="cont_head_text">Play Trailer</div>
                        <div onClick={() => {
                            func()
                            setFullScreen(false)    
                        }} 
                        className="cont_head_icon"
                        >
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className="trailer_wrap_cont_player">
                        {
                        (isSuccess && vidUrl.current.length != 0) 
                        ? <iframe key={"qwerty"} src={(vidUrl.current != undefined || vidUrl.current.length != 0) && vidUrl.current[0]} frameBorder="0" allowFullScreen></iframe>
                        :  isOn && <VideoPlayer screen={isFullScreen} setScreen={fullSc} />
                        }
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Trailer_Player