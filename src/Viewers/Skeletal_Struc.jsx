import React, { useRef, useState } from 'react'
import Struct_Titles from './Comps/Struct_Titles'
import Struct_Dates from './Comps/Struct_Dates'
import Struct_Videos from './Comps/Struct_Videos'
import Struct_Reviews from './Comps/Struct_Reviews'
import Struct_Backdrops from './Comps/Struct_Backdrops'
import { useSelector } from 'react-redux'
import { rgbColor } from '../app/AppFunctions/colorPicker'
import AM_Header from '../Components2/AM_Header'
import Types from '../Customs/Types'
import Countries from "../../countries.json"
import Struct_Translate from './Comps/Struct_Translate'

const Skeletal_Struc = (props) => {

  const position = Types(location.pathname);

 const incld = props?.type;
 const  titles = props?.property;
 const logos = props?.property
 const dates = props?.property;
 const backdrops = props?.property;
 const videos = props?.property;
 const translation = props?.property;
 const posters = props?.property

 const languageName = new Intl.DisplayNames(["en"], {type: "language"})

 // for loading purposes
 const bools = props?.bool;

  const tempKey = () => {
    let item;
    let i = 0;
    for(let key in videos){
      if(i == 0){
        item = key
      }
      i++
    }
    return item
  }

  function tempKey2() {
    if(incld == "Backdrops"){
      let backdropsItem = backdrops?.map((item) => item.iso_639_1 == null ? "No Language" : item.iso_639_1) ;
      let filtered = (backdropsItem).reduce((a,b) => a.includes(b) ? a : [...a, b], []);
      if(filtered.includes("No Language")){
        return "No Language"
      }else{
        return filtered[0]
      }
    }else if(incld == "Logos"){
      let logosItem = logos?.map((item) => item.iso_639_1 == null ? "No Language" : item.iso_639_1) ;
      let filtered = (logosItem).reduce((a,b) => a.includes(b) ? a : [...a, b], []);
      if(filtered.includes("No Language")){
        return "No Language"
      }else{
        return filtered[0]
      }
    }else if(incld == "Posters"){
      let postersItem = posters?.map((item) => item.iso_639_1 == null ? "No Language" : item.iso_639_1) ;
      let filtered = (postersItem).reduce((a,b) => a.includes(b) ? a : [...a, b], []);
      if(filtered.includes("No Language")){
        return "No Language"
      }else{
        return filtered[0]
      }
    }else if(incld == "Videos"){
      let videosItem = videos?.map((item) => item.type == null ? "No Category" : item.type) ;
      let filtered = (videosItem).reduce((a,b) => a.includes(b) ? a : [...a, b], []);
      if(filtered.includes("No Category")){
        return "No Category"
      }else{
        return filtered[0]
      }
    }
    
  }

  let url = location.pathname;

  // state for anime or manga
  const [strucState, setStruc] = useState(url.includes("videos") && tempKey())

  // state for movies or series
  let [BS, setBS] = useState((position == "anime" || position == "manga") ? "All" : tempKey2())

  const makeKeys = () => {

  }

  const makeKeys2 = (obj) => {
    let arr = []
    for(let key in obj){
      arr.push(key)
    }
    return arr
  }

 const navTitles = 
 ((position == "anime" || position == "manga") && incld == "Titles")
 ?  titles?.map((item) => {
      if(item.type == "Default"){
        return "Main"
      }else if(item.type == "Synonym"){
        return "Others"
      }else{
        return item.type;
      }
    })
  : ((position == "anime" || position == "manga") && incld == "Dates")
  ? ["All"]
  : ((position == "anime" || position == "manga") && incld == "Backdrops")
  ? ["All"]
  : ((position == "anime" || position == "manga") && incld == "Videos")
  ? makeKeys2(videos)
  : ((position == "series" || position == "movies") && incld == "Titles")
  ? titles?.map((item ) => {
      return item.iso_3166_1;
    })
  : ((position == "series" || position == "movies") && incld == "Dates")
  ? dates?.map((item) => {
      return item.iso_3166_1
    })
  : ((position == "series" || position == "movies") && incld == "Translation")
  ? translation?.map((item) => {
      return item.iso_3166_1
    })
  : ((position == "series" || position == "movies") && incld == "Backdrops")
  ? backdrops?.map((item) => {
      return (item.iso_639_1 == null || item.iso_639_1 == undefined) ? "No Language" : item.iso_639_1
    })?.reduce((a,b) => a.includes(b) ? a : [...a, b], [])
  : ((position == "series" || position == "movies") && incld == "Logos")
  ? logos?.map((item) => {
      return (item.iso_639_1 == null || item.iso_639_1 == undefined) ? "No Language" : item.iso_639_1
    })?.reduce((a,b) => a.includes(b) ? a : [...a, b], [])
  : ((position == "series" || position == "movies") && incld == "Posters")
  ? posters?.map((item) => {
      return (item.iso_639_1 == null || item.iso_639_1 == undefined) ? "No Language" : item.iso_639_1
    })?.reduce((a,b) => a.includes(b) ? a : [...a, b], [])
  : ((position == "series" || position == "movies") && incld == "Videos")
  ? videos?.map((item) => {
      return (item.type != null || item.type != undefined) ? item.type : "No Category"
    })?.reduce((a,b) => a.includes(b) ? a : [...a, b], [])
  : ""

  const nav_body = (arr) => {
    let data = arr?.map((item, index) => ( <div 
      onClick={() => {
        scrollToItem(item)
      }} 
      key={index} 
      className="struc_navigate">{
        (position == "manga" || position == "anime")
        ? item
        : Countries.map((country) => {
          if(country.code != item)return;
          return (
            country.code == item ? country.name : item
          )
        })
      }</div> ))
    return data
  }

  const nav_body2 = (arr) => {
    let data = arr && arr?.map((item, index) => {
      if(item == "All"){
        return(
          <div 
            key={index}
            className='struc_navigate' 
            style={{background: `rgb(${col})`} }
          >
            {
            /* {item.contains("_") ? item.replace("_", " ") : item} */
              (position == "anime" || position == "manga")
              ? item.replace("_", "")
              : item == "No Language" ? "No Language" : languageName.of(item)
            }
          </div>
        )
      }else{
        return(
          <div 
            key={index}
            className='struc_navigate'
            onClick={() => {
              if((position == "anime" || position == "manga")){
                setStruc(item)
              }else{
                setBS(item)
              }
              
            }}
            style={(strucState == item || BS == item) ? {background: `rgb(${col})`} : {}}
          >
            {
              (position == "anime" || position == "manga")
              ? item.replace("_", "")
              : (incld != "Videos") 
              ? (item == "No Language") ? "No Language" : languageName.of(item)
              : item
            }
          </div>
        )
      }
      
    })
    return data
  }


  let scrollToItem = (item) => {
    let doc = document.querySelector(`#${item}`);
    doc.scrollIntoView({behavior: 'smooth', block: "start"})
  }

  const col = useSelector(rgbColor);

  const styls = {
    background: `rgb(${col})`
  }

  const trusyVal = () => {
    if(navTitles && url.includes("videos")){
      return "1"
    }else if(navTitles && url.includes("backdrops")){
      return "1"
    }else if(navTitles && url.includes("posters")){
      return "1"
    }else if(navTitles && url.includes("logos")){
      return "1"
    }else{
      return "0"
    }
  }

  if(bools == undefined || bools == false)
  
  return (
    <div className="skeletal_frameWork">
      <AM_Header bgClr={col} />
      <div className="skeletal_struct">
          <div className="struct_1">
            <div style={styls} className="struct_head_nav">{incld}</div>
            <div className="struct_head_body">{trusyVal() == "0" ? nav_body(navTitles) : nav_body2(navTitles)}</div>
          </div>
          <div className="struct_2">
            {
              incld == "Titles"
              ? <Struct_Titles property={titles} />
              : incld == "Dates"
              ? <Struct_Dates property={dates} />
              : incld == "Backdrops"
              ? <Struct_Backdrops property={backdrops} strCo={BS} typeSet={"backdrop"} />
              : (incld == "Videos" && bools == false)
              ? <Struct_Videos strCo={position == "anime" ? (strucState || navTitles[0]) : BS} property={videos} />
              : (incld == "Translation")
              ? <Struct_Translate property={translation} />
              :  (incld == "Logos")
              ? <Struct_Backdrops property={logos} strCo={BS} typeSet={"logo"}  />
              : (incld == "Posters")
              ? <Struct_Backdrops property={posters} strCo={BS} typeSet={"poster"} />
              : ""
            }
          </div>
      </div>
    </div>
    
  )
}

export default Skeletal_Struc