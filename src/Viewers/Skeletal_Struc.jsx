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

const Skeletal_Struc = (props) => {
 const incld = props?.type;
 const  titles = props?.property;
 const dates = props?.property;
 const backdrops = props?.property;
 const videos = props?.property;

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

  const position = Types(location.pathname);

  let url = location.pathname;

  const [strucState, setStruc] = useState(url.includes("videos") && tempKey())

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
  (incld == "Titles") 
  ? titles.map((item) => {
    if(item.type == "Default"){
      return "Main"
    }else if(item.type == "Synonym"){
      return "Others"
    }else{
      return item.type;
    }
  })
  : (incld == "Dates")
  ? ["All"]
  : incld == "BackDrops"
  ? ["All"]
  : incld == "Videos"
  ? makeKeys2(videos)
  : ""


 

  const nav_body = (arr) => {
    let data = arr?.map((item, index) => ( <div 
      onClick={() => {
        scrollToItem(item)
      }} 
      key={index} 
      className="struc_navigate">{item}</div> ))
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
            {item.replace("_", " ")}
          </div>
        )
      }else{
        return(
          <div 
            key={index}
            className='struc_navigate'
            onClick={() => {
              setStruc(item)
            }}
            style={(strucState == item) ? {background: `rgb(${col})`} : {}}
          >
            {item.replace("_", " ")}
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
              : incld == "BackDrops"
              ? <Struct_Backdrops property={backdrops} />
              : (incld == "Videos" && bools == false)
              ? <Struct_Videos strCo={strucState || navTitles[0]} property={videos} />
              : ""
            }
          </div>
      </div>
    </div>
    
  )
}

export default Skeletal_Struc