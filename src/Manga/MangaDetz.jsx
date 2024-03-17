import React from 'react'
import F1 from "../assets/FormImgs/FormLogo1.webp"
import { Link } from 'react-router-dom';
import EachXsDev from '../Components/EachXsDev';
import DataSettings1 from '../Components/DataSettings1';

const MangaDetz = (props) => {

    const type = () => {
        let url = location.pathname;
        if(url.includes("manga")){
            return "manga"
        }else{
            return "anime"
        }
    }

    let mdf = {...props.mdf}
    let wImg = !mdf.images.webp.image_url ? F1 : mdf.images.webp.image_url;
    let ttl = !mdf.title ? "Testing" : mdf.title;
    let sc = !mdf.score ? 20 : parseFloat(mdf.score) * 10

    let RFRM = type() == "manga" ? 
    (!mdf.published) ? "" : mdf?.published?.from
    : type() == "anime" ? 
    (!mdf.aired) ? "" : mdf?.aired?.from 
    : "";

    let RTRM = type() == "manga" ? 
    (!mdf.published) ? "" : mdf?.published?.to
    : type() == "anime" ? 
    (!mdf.aired) ? "" : mdf?.aired?.to 
    : "";
    
    let SYNBG = !mdf ? "" : mdf?.synopsis;

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

        <DataSettings1 file={{id: mdf.mal_id}} />
        
        <Link to={`${firstPath}/${mdf.mal_id}`} state={{data: {url: `${fullPath}`}}}>
            <EachXsDev file={{firstAngle, secondAngle, sc, ttl, RFRM, RTRM, color, wImg, SYNBG}} />
        </Link>
    </div>
  )
}

export default React.memo(MangaDetz)