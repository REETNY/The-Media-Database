import React, { useEffect, useRef, useState } from 'react'
import {AiFillSound} from "react-icons/ai"
import { FaVolumeMute, FaVolumeUp, FaVolumeDown } from "react-icons/fa"
import OutsideClickHandler from 'react-outside-click-handler'

const Sound_Btn = (props) => {

    const {setVol, vol} = props.datas

    const [sound, setSound] = useState(false);

    const Sound_Level = useRef(null);
    

    const openSound = () => {
        setSound(true)
    }

    const closeSound = () => {
        setSound(false)
    }

    const setNewVol = (e) => {
        const perc = parseInt(e.target.value)
        setVol(e.target.value);
        Sound_Level.current.style.background = `linear-gradient(to right, #053a5f 0%, #053a5f ${perc}%, #53585a ${perc}%, #53585a 100%)`;
    }

    useEffect(() => {
        setVol(vol)
        Sound_Level.current.style.background = `linear-gradient(to right, #053a5f 0%, #053a5f ${vol}%, #53585a ${vol}%, #53585a 100%)`;
    }, [])


  return (
    <div className="player_sound_btn">
        
        <OutsideClickHandler children={(e) => e.target} onOutsideClick={(e) => closeSound()} >
            <div 
            onClick={() => sound == true ? closeSound() : openSound()}
            className="player_sound_icon"
            >
                {vol > 50 
                ? <FaVolumeUp />
                : (vol < 50 && vol > 0)
                ? <FaVolumeDown />
                :<FaVolumeMute />
                }
            </div>
            <div onMouseLeave={(e) => closeSound()} className="absolute_cont" style={sound ? {display: "flex"} : {display: "none"}}>
                <span className="volRead">{vol}</span>
                <input ref={Sound_Level} onChange={(e) => setNewVol(e)} type="range" value={vol} min={0} max={100} name="" id="" className="sound_range"/>
            </div>
        </OutsideClickHandler>
    </div>

  )
}

export default Sound_Btn