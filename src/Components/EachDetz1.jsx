import React from 'react'
import { HalfCircle1, HalfCircle2, HalfCircle3 } from '../StyledComponent/components'
import Types from '../Customs/Types';

const EachDetz1 = (props) => {

    const typs = Types(location.pathname)

    const {color, firstAngle, sc, secondAngle, ttl, RFRM, RTRM, wImg} = props.file;

    const type = () => {
        let url = location.pathname;
        if(url.includes("manga")){
            return "manga"
        }else{
            return "anime"
        }
    }

  return (
    <div className="eachManga">

        <div className="mangaImg">
            <img onError={(e) => e.currentTarget.src = (typs == "movies" || typs == "series") ? "" : "" } src={wImg} alt="" />
            <div className="MangaRating">
                <div className="ratefunc">
                    <div className="fullCircle">
                        <HalfCircle1 $clr={color} $fs={firstAngle} ></HalfCircle1>
                        <HalfCircle2 $clr={color} $move={sc} $sc={firstAngle+secondAngle} ></HalfCircle2>
                        {sc > 50 ? <HalfCircle3 $show="false" ></HalfCircle3> : <HalfCircle3 $show="true"></HalfCircle3>}
                        <div className="mainCircle" style={{color}}><span>{Math.floor(sc)}<sub>%</sub></span></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mangaInfo">
            <div className="mangaTitle">{ttl}</div>
            <div className="mangaRel">{RFRM && RFRM.slice(0,10)} {(RTRM != null && RFRM != null) ? "to" : ""} {RTRM && RTRM.slice(0,10)}</div>
        </div>

    </div>
  )
}

export default React.memo(EachDetz1)