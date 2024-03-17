import React, { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import useScreenSize from '../../../Customs/UseScreenSize'
import { useRef } from 'react'
import Score_Chart from '../../../Components/Score_Chart'
import User_Actions from '../../../Components/User_Actions'
import Play_Trailer from '../../../Components/Play_Trailer'
import Trailer_Player from '../../../Components/Trailer_Player'
import Writer_Creator_ScreenPlay from '../../../Components/Writer_Creator_ScreenPlay'
import Min_Casts from '../../../Components/Min_Casts'
import Min_Socials from '../../../Components/Min_Socials'
import Min_Media from '../../../Components/Min_Media'
import Min_Recom from '../../../Components/Min_Recom'
import { useSelector } from 'react-redux'
import { rgbColor } from '../../../app/AppFunctions/colorPicker'

const AM_Index = () => {

  const [RGB, setRGB] = useState({})
  const [trailer, setTT] = useState({
    isPlay: false
  })
  let data = useOutletContext();
  const screenSize = useScreenSize();
  const xsColor = useRef({
    R: "",
    G: "",
    B: ""
  })

  const {image_url, large_image_url} = data?.entities[data?.ids[0]]?.images?.webp
  const { title, published, genres, volumes, chapters, synopsis, authors, score, id, background, aired } = data?.entities[data?.ids[0]]

  const getYear = (date) => {
    return `(${new Date(date).getFullYear()})`
  }

  const checkAgeR = (arr) => {
    const item =  arr.filter((item) =>  {
      if((item.name == "Ecchi" || item.name == "Manhwa"  || item.name == "Hentai" || item.name == "Erotica")){
        return item
      }else{
        false
      }
    })
    return item
  }

  const formatYear = (date) => {
    let CD = new Date(date);
    const day = CD.getDay() > 9 ? CD.getDay() : `0${CD.getDay()}`;
    const month = CD.getMonth() > 9 ? CD.getMonth() : `0${CD.getMonth()}`;
    const year = CD.getFullYear();
    return `${day}/${month}/${year}`
  }

  const generateGenres = (arr) => {
    let GG = ""
    arr.map((item, index) => {
      if(index == (arr.length - 1)){
        GG += `${item.name}.`
      }else{
        GG += `${item.name}, `
      }
    })
    return GG
  }

  const type = () => {
    let url = location.pathname;
    if(url.includes("manga")){
      return "Manga"
    }else{
      return "Anime"
    }
  }

  const selectColor = useSelector(rgbColor) || undefined;
  
  if(selectColor != undefined && Object.keys(RGB).length == 0){

    let splitClr = selectColor.split(",");

    xsColor.current.B = splitClr[2];
    xsColor.current.G = splitClr[1];
    xsColor.current.R = splitClr[0];

    setRGB(() => {
      return ({backgroundImage:`linear-gradient(to right, rgba(${splitClr[0]}, ${splitClr[1]}, ${splitClr[2]}) 15vw, rgba(${splitClr[0]}, ${splitClr[1]}, ${splitClr[2]}, .69) 50vw, rgba(${splitClr[0]}, ${splitClr[1]}, ${splitClr[2]}, .69) 100vw)`})
    })
  }else if(selectColor == undefined && Object.keys(RGB).length == 0){
    setRGB(() => {
      return ({backgroundImage: `linear-gradient(to right, rgba(0,0,0, 1) 15vw, rgba(0,0,0, .69) 50vw, rgba(0,0,0, .69) 100vw)`})
    })
  }

  const writers_authors = (arr, keuWord) => {
    return <Writer_Creator_ScreenPlay datas={{A_D: arr, name: keuWord}} />
  }
  
  const director_writer_screenPlay = () => {

  }

  const playTrailer = () => {
    if(trailer.isPlay){
      let cont = document.querySelector(".trailer_video_abso_wrapper");
      cont.style.backdropFilter = `grayscale(100%)`
    }else{
      let cont = document.querySelector(".trailer_video_abso_wrapper");
      cont.style.backdropFilter = `grayscale(100%)`
    }
    setTT((obj) => ({...obj, isPlay: !trailer.isPlay}))
    document.body.style.setProperty(
      '--forInput', 
      `0%`
    );
  }


  const sc = parseFloat(Math.floor(score*10))
  let firstAngle;
  let secondAngle;

  if(sc > 50){
      let Angle = 3.6;
      firstAngle = Angle * (50);
      secondAngle = Angle * (sc - 50)
  }else{
      let Angle = 3.6;
      firstAngle = Angle * (sc);
  }

  let color = "";
  let color2 = "";

  if(sc <= 25){
      color = 'rgba(218, 33, 33, 0.932)'
      color2 = `rgb(138, 17, 17)`
  }else if(sc > 25 && sc <= 50){
      color = "rgba(240, 129, 25, 0.932)"
      color2 = "rgb(138, 74, 18)"
  }else if(sc > 50 && sc <= 75){
      color = "rgba(241, 241, 34, 0.952)"
      color2 = "rgb(122, 122, 24)"
  }else if(sc > 75 && sc <= 100){
      color = "rgba(13, 148, 13, 0.952)"
      color2 = 'rgb(2, 48, 32)'
  }

  // hero desc cont

  return (
    <section className='forAM_Index'>

      <div className="AM_Index_Head">
        <div className="Index_Head_Wrapper">
          <div className="Index_Head2_Wrapper">
            <div className="Index_Head3_Wrapper" style={RGB}>
              <div className="hero_container_desc">
                <div className="hero_img_cont">
                  <div className="image_wrapper_hero">
                    <img src={image_url} alt="" />
                  </div>
                </div>
                <div className="hero_desc_cont">
                  <div className="desc_cont_wrapper">

                    <div className="desc_title_head"> 
                      <div className="title_header">
                        <span className="title_head">{title}</span> 
                        <span className="title_year">{type() == "Manga" ? getYear(published?.from) : getYear(aired?.from)}</span>
                      </div>
                      <div className="desc_info_wrap">
                        <div style={checkAgeR(genres).length == 0 ? {borderColor: "green", color: "green"} : {borderColor: "red", color: "red"}} className="ageRating_info">{checkAgeR(genres).length == 0 ? "PG - All" : "Explicit 18"}</div>
                        <div className="fullYearRelease_info">{type() == "Manga" ? formatYear(published?.from) : formatYear(aired?.from)} {`(JP)`}</div>
                        <div className="generes_infom"><li>{generateGenres(genres)}</li></div>
                        <div className="volumes_chapter_seasons_timestamp">{
                          type() == "Manga" 
                          ? ((chapters != null && volumes != null) ? <li>{(chapters != null || chapters == "") ? `Chapters - ${chapters}` : ``} - {(volumes != null || volumes == "") ? `Volumes - ${volumes}` : ``}</li> : "")
                          : ""
                        }</div>
                      </div>
                    </div>

                    <div className="actions automatic">
                      <div className="action_wrapper">

                        <div className="chart">
                          <div className="chart_wrap">
                            <Score_Chart data={{color: color, color2:color2, firstAngle:firstAngle, secondAngle: secondAngle, score:score}} />
                          </div>
                          <div className="chart_head">User Score</div>
                        </div>

                        <div className="user_action_btns">
                          <div className="user_action_btns_wrap">
                            <User_Actions id={id} type={type()} />
                          </div>
                        </div>

                        {type() != "Manga" && <div className="play_main_trailer_wrap">
                          <Play_Trailer data={{func: playTrailer}} />
                        </div>}
                        
                      </div>
                    </div>

                    <div className="header_overview_cont_wrapper">
                      <div className="overview_wrap">
                        <div className="overview_wrap_head_text">Overview</div>
                        <div className="overview_wrap_head_content">{synopsis}</div>
                      </div>
                    </div>

                    <div className="creators_head_wrapper">
                        <div className="eaxh_creators_wrap_cont">
                          {type() == 'Manga' && writers_authors(authors, "Author")}
                        </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="backDrop_hero_img">
              <span className="heroImg">
                <img src={image_url} alt="" />
              </span>
            </div>

          </div>

          {/* XS View */}
          <div style={{background: `rgb(${xsColor.current.R},${xsColor.current.G}, ${xsColor.current.B})`}} className="XS_Device_view">
            <div className="hero_desc_cont">
              <div className="desc_cont_wrapper">

                <div className="desc_title_head"> 
                  <div className="title_header">
                    <span className="title_head">{title}</span> 
                    <span className="title_year">{type() == "Manga" ? getYear(published?.from) : getYear(aired?.from)}</span>
                  </div>
                  <div className="desc_info_wrap">
                    <div style={checkAgeR(genres).length == 0 ? {borderColor: "green", color: "green"} : {borderColor: "red", color: "red"}} className="ageRating_info">{checkAgeR(genres).length == 0 ? "PG - All" : "Explicit 18"}</div>
                    <div className="fullYearRelease_info">{type() == "Manga" ? formatYear(published?.from) : formatYear(aired?.from)} {`(JP)`}</div>
                    <div className="generes_infom"><li>{generateGenres(genres)}</li></div>
                    <div className="volumes_chapter_seasons_timestamp">{
                      type() == "Manga" 
                      ? ((chapters != null && volumes != null) ? <li>{(chapters != null || chapters == "") ? `Chapters - ${chapters}` : ``} - {(volumes != null || volumes == "") ? `Volumes - ${volumes}` : ``}</li> : "")
                      : ""
                    }</div>
                  </div>
                </div>

                <div className="actions automatic">
                  <div className="action_wrapper">

                    <div className="chart">
                      <div className="chart_wrap">
                        <Score_Chart data={{color: color, color2:color2, firstAngle:firstAngle, secondAngle: secondAngle, score:score}} />
                      </div>
                      <div className="chart_head">User Score</div>
                    </div>

                    <div className="user_action_btns">
                      <div className="user_action_btns_wrap">
                        <User_Actions id={id} type={type()} />
                      </div>
                    </div>

                    {type() != "Manga" && <div className="play_main_trailer_wrap">
                      <Play_Trailer data={{func: playTrailer}} />
                    </div>}
                    
                  </div>
                </div>

                <div className="header_overview_cont_wrapper">
                  <div className="overview_wrap">
                    <div className="overview_wrap_head_text">Overview</div>
                    <div className="overview_wrap_head_content">{synopsis}</div>
                  </div>
                </div>

                <div className="creators_head_wrapper">
                    <div className="eaxh_creators_wrap_cont">
                      {type() == "Manga" ? writers_authors(authors, "Author") : ''}
                    </div>
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="AM_Index_Content">
        <div className="AM_index_content_wrapper">

          <div className="index_content_wrap1">

            <div className="content_wrap_1_cont">
              <div className="content_wrap_head">Top Billed Cast</div>
              <div className="carousel_wrap">
                <Min_Casts data={{id}} />
              </div>
              <div className="link_to_full_casts_crew">
                <Link>Full Casts and Crews</Link>
              </div>
            </div>

            <div className="content_wrap_1_cont">
              <Min_Socials data={{id}} />
            </div>

            <div className="content_wrap_1_cont">
              <Min_Media data={{id}} />
            </div>

            <div className="content_wrap_1_cont">
              <div className="content_wrap_head">Recommendations</div>
              <Min_Recom data={{id, title}} />
            </div>

          </div>

          <div className="index_content_wrap2">
            
          </div>

        </div>
      </div>

      {type != "Manga" && <Trailer_Player data={{isOn: trailer.isPlay , func: playTrailer, type: type().toLowerCase(), id}} />}

    </section>
  )
}

export default AM_Index