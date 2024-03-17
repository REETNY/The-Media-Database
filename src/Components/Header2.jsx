import React, { useState } from 'react'
import Min_DropDown from './Min_DropDown'

const Header2 = () => {

  return (

    <div className="header2">

      <div className="header_2_content">

        <Min_DropDown period={{type: "view", name: "Overview", arr:["Main", "Cast & Crews", "Alternative Titles", "Release Dates", "Translation"], arr2: ["main", "casts","titles", "dates", "translation"], pathLess: ""}} />

        <Min_DropDown period={{type: "media", name: "Media", arr:["Backdrops", "Logos", "Posters", "Videos"], arr2: ["backdrops", "logos", "posters", "videos"], pathLess: "images"}} />

        <Min_DropDown period={{type: "fandom", name: "Fandom", arr:["Discussion", "Reviews"], arr2: ["discussion", "reviews"], pathLess: "reviews"}}  />

        <Min_DropDown period={{type: "share", name: "Share", arr:["Share Link", "Facebook", "Twitter"], arr2: []}} />
        
      </div>

    </div>

  )
}

export default Header2