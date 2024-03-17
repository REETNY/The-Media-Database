import React from 'react'
import { useMoreInfoQuery } from '../app/Jikan/jikanSlice'

const MoreInfo = () => {

    let type = () => {
        let res = location.pathname;
        if(res.includes("manga") || res.includes("anime")){
            return "AMMA"
        }else{
            return "MOTV"
        }
    }

  return (
    <div>MoreInfo</div>
  )
}

export default MoreInfo