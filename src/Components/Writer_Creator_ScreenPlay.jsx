import React from 'react'
import { Link } from 'react-router-dom';

const Writer_Creator_ScreenPlay = (props) => {
    const { A_D, name} = props.datas;
  return (
    <div className="eaxh_creator_wrap">
        <span className="names_of_underScore">
            { (A_D.length > 0) ?
                A_D?.map((item,index) => (<Link key={index+1}>{item.name}</Link>))
                :
                ""
            }
        </span>
        <span className="underScore_head">{
        (A_D.length == 0 )
        ? "" 
        : (A_D.length > 1)
        ? `${name}s`
        : `${name}`
        }</span>
    </div>
  )
}

export default Writer_Creator_ScreenPlay