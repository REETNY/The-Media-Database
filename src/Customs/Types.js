import React from 'react'

const Types = (str) => {
  if(str.includes("anime")){
    return "anime"
  }else if(str.includes("manga")){
    return "manga"
  }else if(str.includes("movies")){
    return "movies"
  }else{
    return "series"
  }
}

export default Types