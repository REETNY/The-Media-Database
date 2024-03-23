import React from 'react'
import Types from "../../Customs/Types"
import Countries from "../../../countries.json"

const Struct_Dates = (props) => {

  let dates = props.property;
  let checkArr = Array.isArray(dates)
  let Typ = Types(location.pathname)

  // let Date = []
  let DateStr;

  if(checkArr == false && dates != undefined && (Typ == "manga" || Typ == "anime")){
    DateStr = dates?.string.split("to");
  }else if(checkArr == true && dates != undefined){

  }

  function FD(date) {
    let raw = new Date(date)
    return `${raw.getDate()}/${raw.getMonth() + 1}/${raw.getFullYear()}`
  }

  const struc_Dates = (Typ != "anime" && Typ != "manga") ? dates?.map((item, index) => {
    let classTil;
    if (item.type == "Default"){
      classTil = "Main"
    }else if(item.type == "Synonym"){
      classTil = "Others"
    }else{
      classTil = (Typ == "anime" || Typ == "manga") ? item.type : item.iso_3166_1
    }

    return (
      <div key={index} id={classTil} className="struc_T">
        <div className="struc_T_head">
          { (Typ == "movies" || Typ == "series") && <span className="T_head_flag">
            <img src={`https://flagcdn.com/w40/${item?.iso_3166_1.toLowerCase()}.png`} alt="" />
          </span> }
          <span className="T_head_name">{
            item.type == "Default"
            ? "Main"
            : item.type == "Synonym" 
            ? "Others"
            : (Typ == "anime" || Typ == "manga") ? item.type : Countries.map((country) => item.iso_3166_1 == country.code ? country.name : "")
          }</span>
        </div>
        <div className="struc_T_table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Certification</th>
                <th>Type</th>
                <th>Language</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{FD(item.release_dates[0].release_date)}</td>
                <td>{item.release_dates[0].certification}</td>
                <td>{item.release_dates[0].type}</td>
                <td>{item.release_dates[0].language == undefined ? "" : item.release_dates[0].language}</td>
                <td>{item.release_dates[0].note}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }) : []

  return (
    <div className="struc_date">
      {
       (Typ == "anime" || Typ == "manga")
        ? <div id='All' className="singleDate">
            <div className="singleDateHead">All</div>
            <div className="singleTableItem">
              <table>
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{DateStr[0]}</td>
                    <td>{DateStr[1]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        : 
          <div className="eachStruct_2_cont">
            {struc_Dates}
          </div>
      }
    </div>
  )
}

export default Struct_Dates