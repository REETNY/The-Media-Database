import React from 'react'

const Struct_Titles = (props) => {
  const struc_titles = props?.property?.map((item, index) => {
    let classTil;
    if (item.type == "Default"){
      classTil = "Main"
    }else if(item.type == "Synonym"){
      classTil = "Others"
    }else{
      classTil = item.type;
    }

    return (
      <div key={index} id={classTil} className="struc_T">
        <div className="struc_T_head">
          {/* <span className="T_head_flag"></span> */}
          <span className="T_head_name">{
            item.type == "Default"
            ? "Main"
            : item.type == "Synonym" 
            ? "Others"
            : item.type
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