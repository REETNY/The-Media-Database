import React from 'react'
import YellowEmoji from "../Files/yellowy.webp"
import BlueEmoji from "../Files/blueyImg.webp"
import GrayEmoji from "../Files/grayey.webp"
import BlackEmoji from "../Files/blackey.webp"

const Nothing = () => {

    let emoji =  [YellowEmoji, BlueEmoji, GrayEmoji, BlackEmoji]
    let deriveRan = () => {
        return emoji[Math.floor(Math.random() * 4)]
    }
  return (
    <div className="nothingUI">
        <div className="nothingHero">
            <img src={deriveRan()} alt="" />
        </div>
        <div className="nothingText">Sorry, Nothing To Show In Here!</div>
    </div>
  )
}

export default Nothing