import React from 'react'
import Countries from "../../../countries.json";
import Types from '../../Customs/Types';

const Struct_Titles = (props) => {
  
  const types = Types(location.pathname)

  const struc_titles = props?.property?.map((item, index) => {
    let classTil;
    if (item.type == "Default"){
      classTil = "Main"
    }else if(item.type == "Synonym"){
      classTil = "Others"
    }else{
      classTil = (types == "anime" || types == "manga") ? item.type : item.iso_3166_1
    }

    return (
      <div key={index} id={classTil} className="struc_T">
        <div className="struc_T_head">
          { (types == "movies" || types == "series") && <span className="T_head_flag">
            <img src={`https://flagcdn.com/w40/${item?.iso_3166_1.toLowerCase()}.png`} alt="" />
          </span> }
          <span className="T_head_name">{
            item.type == "Default"
            ? "Main"
            : item.type == "Synonym" 
            ? "Others"
            : (types == "anime" || types == "manga") ? item.type : Countries.map((country) => item.iso_3166_1 == country.code ? country.name : "")
          }</span>
        </div>
        <div className="struc_T_table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item.title}</td>
                <td>{item.type == "Default" ? 
                    "Main"
                    : item.type == "Synonym"
                    ? "Others"
                    : item.type
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  })
  
  return (
    <div className="eachStruct_2_cont">
      {struc_titles}
    </div>
  )
}

export default Struct_Titles