import React from 'react'
import Types from '../../Customs/Types';
import { FaLock, FaStar } from "react-icons/fa"
import { v4 as uuidv4 } from 'uuid';


// also used for posters and logos

const Struct_Backdrops = (props) => {
  let typs = Types(location.pathname)
  let backdrops = props?.property;
  let typeSet = props?.typeSet
  let state = props?.strCo;

  const DisplayNames = new Intl.DisplayNames(["en"], {type: "language"})

  let mappedArr = [];

  const mediaType = location.pathname;

  const imageSizeCal = (file) => {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.crossOrigin = "Anonymous"
      img.src = file;
      img.onload = () => {
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        let res = `${width} / ${height}`
        resolve(res)
      }
      img.onerror = () => {
        reject(`? / ?`)
      }
    })
  }

  const sizeCal = async(file) => {
    try{
      let res = await imageSizeCal(file)
      return res
    }catch(err){
      return `? / ?`
    }
  }

  if(Array.isArray(backdrops) && (typs == "anime" || typs == "manga")){
    mappedArr = backdrops.map((item, index) => {
      let mapper = []
      let i = 0
      for(let imgss in item){
        let filePath = (item[imgss].image_url);
        let typ = imgss;
        let addedBy = "Jikan";
        let language = "All"
        let size = sizeCal(filePath && filePath);
        i++

        mapper.push(
          (
            <div key={uuidv4()} className="drops_cont">
              <div className="drop_cont_hero">
                <img src={filePath} alt={language} />
              </div>
              <div className="drop_cont_details">
                <div className="drop_content">
                  <span className="drop_content_item">Info</span>
                  <span className="drop_content_item"><FaLock /></span>
                </div>
                {(!mediaType.includes("backdrops") || !mediaType.includes("posters")) && <div className="drop_content">
                  <span className="drop_content_item">Format</span>
                  <span className="drop_content_item">{typ}</span>
                </div>}
                <div className="drop_content">
                  <span className="drop_content_item">Added By</span>
                  <span className="drop_content_item">{addedBy}</span>
                </div>
                {/* <div className="drop_content">
                  <span className="drop_content_item">Size</span>
                  <span className="drop_content_item"></span>
                </div> */}
                <div className="drop_content">
                  <span className="drop_content_item">Language</span>
                  <span className="drop_content_item_Lang">{language}</span>
                </div>
                {/* {(!mediaType.includes("backdrops") || !mediaType.includes("logos")) &&  <div className="drop_content">
                  <span className="drop_content_item">Primary</span>
                  <span className="drop_content_item"></span>
                </div>} */}
              </div>
            </div> 
          )
        )
      }
      return [...mapper]
      
    })
  }else{
    mappedArr = 
    backdrops 
    ? backdrops?.map((item) => {
      let langType = state == "No Language" ? null : state

      if(langType != item.iso_639_1)return;
      return(
        <div key={uuidv4()} className="drops_cont">
          <div className="drop_cont_hero">
            <img src={`https://image.tmdb.org/t/p/w500${item.file_path}`} alt={"View Orirginal"} />
          </div>
          <div className="drop_cont_details">
            <div className="drop_content">
              <span className="drop_content_item">Info</span>
              <span className="drop_content_item"><FaLock /></span>
            </div>
            {(typeSet == "logo") && <div className="drop_content">
              <span className="drop_content_item">Format</span>
              <span className="drop_content_item">{"typ"}</span>
            </div>}
            <div className="drop_content">
              <span className="drop_content_item">Added By</span>
              <span className="drop_content_item">{"addedBy"}</span>
            </div>
            <div className="drop_content">
              <span className="drop_content_item">Original Size</span>
              <span className="drop_content_item">
                {item.width} by {item.height}
              </span>
            </div>
            <div className="drop_content">
              <span className="drop_content_item">Language</span>
              <span className="drop_content_item_Lang">
                {
                  state == "No Language" 
                  ? "No Language" 
                  : DisplayNames.of(state)
                }
              </span>
            </div>
            {(typeSet == "poster") &&  <div className="drop_content">
              <span className="drop_content_item">Primary</span>
              <span className="drop_content_item"><FaStar /></span>
            </div>}
          </div>
        </div> 
      )
    })
    : []
  }

  if(typs == "anime" || typs == "manga"){
    return (
      <div className="eachStruct_2_cont_BPL">
        {
          (typs == "anime" || typs == "manga")
          ? mappedArr.flat()
          : ""
        }
      </div>
    )
  }

  if(typs == "movies" || typs == "series"){
    return (
      <div className="eachStruct_2_cont_BPL">
        {
          mappedArr
        }
      </div>
    )
  }
  
}

export default Struct_Backdrops