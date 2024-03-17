import React from 'react'
import Types from '../../Customs/Types';
import { FaLock } from "react-icons/fa"
import { v4 as uuidv4 } from 'uuid';

// also used for posters and logos

const Struct_Backdrops = (props) => {
  
  let backdrops = props?.property;

  let mappedArr = [];

  let typs = Types(location.pathname)

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

  }

  console.log(backdrops);

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

export default Struct_Backdrops