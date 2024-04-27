import React from 'react'
import F1 from "../assets/FormImgs/FormLogo1.webp"
import { Link } from 'react-router-dom';
import EachXsDev from '../Components/EachXsDev';
import DataSettings1 from '../Components/DataSettings1';

const Tv_Detz = (props) => {
    const type = () => {
        let path = location.pathname;
        if(path.includes("movie")){
          return "movie"
        }else{
          return "series"
        }
      }

      console.log(props);
    
      let mdf = {...props.mdf}
      let wImg = !mdf.backdrop_path ? F1 : `https://image.tmdb.org/t/p/w500${mdf.poster_path}`;
      let ttl = !mdf.name ? "" : mdf.name;
      let sc = !mdf.vote_average ? 20 : parseFloat(mdf.vote_average) * 10
    
      let RFRM = type() == "movie" ? 
      (!mdf?.release_date) ? "" : mdf?.release_date
      : type() == "series" ? 
      (!mdf.first_air_date) ? "" : mdf?.first_air_date 
      
      : "";
    
      let RTRM = type() == "series" 
      ? (!mdf.last_air_date) ? "" : mdf?.last_air_date
      : "";
      
      let SYNBG = !mdf ? "" : mdf?.overview;
    
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
    
      if(sc <= 25){
          color = 'rgba(218, 33, 33, 0.932)'
      }else if(sc > 25 && sc <= 50){
          color = "rgba(240, 129, 25, 0.932)"
      }else if(sc > 50 && sc <= 75){
          color = "rgba(241, 241, 34, 0.952)"
      }else if(sc > 75 && sc <= 100){
          color = "rgba(13, 148, 13, 0.952)"
      }
    
      const firstPath = location.pathname;
      const fullPath = `${firstPath}${location.search}`
    
      return (
        <div id='relfexCont'>
    
            <DataSettings1 file={{id: mdf.id}} />
            
            <Link to={`${firstPath}/${mdf.id}`} state={{data: {url: `${fullPath}`}}}>
            <EachXsDev file={{firstAngle, secondAngle, sc, ttl, RFRM, RTRM, color, wImg, SYNBG}} />
            </Link>
        </div>
    )
}

export default Tv_Detz