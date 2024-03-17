import React, { memo, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { FaCaretDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Types from '../Customs/Types';

const Min_DropDown = (props) => {

    const {arr, name, arr2, pathLess, type} = props.period;

    let url = location.pathname;

    let isTrue;

    const typs = Types(location.pathname)

    const arry = typs == "anime"
    ? arr.filter((item) => (item == "Translation" || item == "Logos" || item == "Posters") ? false : item)
    : typs == "manga"
    ? arr.filter((item) => (item == "Translation" || item == "Logos" || item == "Posters" || item == "Videos") ? false : item)
    : arr

    const arry2 = typs == "anime"
    ? arr2.filter((item) => (item == "translation" || item == "logos" || item == "posters") ? false : item)
    : typs == "manga"
    ? arr2.filter((item) => (item == "translation" || item == "logos" || item == "posters" || item == "posters") ? false : item)
    : arr2

    if(url.includes("images")){
        isTrue = "Media"
    }else if(url.includes("reviews")){
        isTrue = "Fandom"
    }else{
        isTrue = "Overview"
    }

    let [stat, setStat] = useState(false)

    const undo = () => {
        setStat(false)
    }

    let refA = useDetectClickOutside({onTriggered: undo})

    const open = () => {
        setStat(() => !stat)
    }

  return (
    <div className="drop_view"  ref={refA} onClick={() => open()}>
        <span className={isTrue == name ? "head2_head active" : "head2_head"}>
            {name} 
            <span className={stat ? "caretIc active" : "caretIc"}><FaCaretDown /></span>
        </span>
        <span className={stat ? "head2_rollDown open" : "head2_rollDown"}>
          <ul>
            {
                type != "share" ?

                arry.map((item, index) => (<NavLink key={index} end style={({isActive}) => isActive ? {background: "red"} : {}} to={ 
                (arry2[index] == "main" || arry2[index] == "reviews")
                ? pathLess == "" ? arry2[index] == "main" && "" : "reviews"
                : pathLess == "" ? arry2[index] : `${pathLess+"/"+arry2[index]}` }>{item}</NavLink>))
                
                : 
                arr.map((item, index) => {
                    if(index == 0){
                        return (<button key={index} >{item}</button>)
                    }else{
                        return (<a key={index} target='_blank' href={"me"}>{item}</a>)
                    }
                })
            }
          </ul>
        </span>
    </div>
  )
}

export default memo(Min_DropDown)