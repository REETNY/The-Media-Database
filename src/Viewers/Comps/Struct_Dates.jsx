import React from 'react'
import Types from "../../Customs/Types"

const Struct_Dates = (props) => {

  let dates = props.property;
  let checkArr = Array.isArray(dates)
  let Typ = Types(location.pathname)

  let Date = []
  let DateStr;

  if(checkArr == false && dates != undefined){
    DateStr = dates?.string.split("to");
  }else if(checkArr == true && dates != undefined){

  }

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
        : ''
      }
    </div>
  )
}

export default Struct_Dates