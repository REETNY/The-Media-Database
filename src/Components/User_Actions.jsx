import React, { useEffect, useRef, useState } from 'react'
import { BsBookmarkFill, BsHeartFill, BsStarFill, BsList } from 'react-icons/bs'
import { FaStarHalfAlt} from "react-icons/fa";
import { FaMinusCircle } from 'react-icons/fa';
import { add_remove_Like, add_remove_favourite, add_remove_read_watched, addRating, removeRating } from '../app/AppFunctions/DataDetzSlice'
import { useSelector, useDispatch } from 'react-redux'
import { ALLData } from '../app/AppFunctions/DataDetzSlice'
import OutsideClickHandler from 'react-outside-click-handler';

const User_Actions = ({id, type}) => {
  const [D_D, setDD] = useState({
    rate: ""
  });
  const [rel, setRel] = useState(false);
  const refItems = useRef([])
  const All_Data = useSelector(ALLData)
  const dispatch = useDispatch()
  let {list, favourite, read_watch, rating}  = All_Data[type.toLowerCase()];

  const isLiked = list?.filter((item) => item.id == id ? item : false);
  const isFavourite = favourite?.find((item) => item.id == id);
  const isRead_Watch = read_watch?.find((item) => item.id == id);
  const ratz = rating?.find((item) => item.id == id)

  const ADD_RATE = (e, id) => {
    const widthArea = 160;
    let offsetY = e.nativeEvent.offsetX;
    let C_A = parseFloat(Math.floor(offsetY / 1.6))

    if(C_A >0 && C_A <= 10){
      dispatch(addRating({type: `${type.toLowerCase()}`, id, rate: 0.5}))
    }else if(C_A >= 13 && C_A <= 21){
        dispatch(addRating({type: `${type.toLowerCase()}`, id, rate: 1}))
    }else if (C_A >= 23 && C_A <= 31){
        dispatch(addRating({type: `${type.toLowerCase()}`, id, rate: 1.5}))
    }else if(C_A >= 33 && C_A <= 41){
        dispatch(addRating({type: `${type.toLowerCase()}`, id, rate: 2}))
    }else if(C_A >= 43 && C_A <= 51){
        dispatch(addRating({type: `${type.toLowerCase()}`, id, rate: 2.5}))
    }else if(C_A >= 53 && C_A <= 61){
        dispatch(addRating({type: `${type.toLowerCase()}`, id, rate: 3}))
    }else if (C_A >= 63 && C_A <= 71){
        dispatch(addRating({type: `${type.toLowerCase()}`, id, rate: 3.5}))
    }else if(C_A >= 73 && C_A <= 81){
        dispatch(addRating({type: `${type.toLowerCase()}`, id, rate: 4}))
    }else if(C_A >= 83 && C_A <= 91){
        dispatch(addRating({type: `${type.toLowerCase()}`, id, rate: 4.5}))
    }else if(C_A >= 93 && C_A <= 100){
        dispatch(addRating({type: `${type.toLowerCase()}`, id, rate: 5}))
    }else if(C_A == 0){
        dispatch(addRating({type: `${type.toLowerCase()}`, id, rate: 0}))
    }
  }

  const RV = (num) => {

    let rv = num;

    if(rv == "0"){
        return (
            <>
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
            </>
        )
    }else if(rv == "0.5"){
        return (
            <>
                <FaStarHalfAlt style={{color: "gold"}} />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
            </>
        )
    }else if(rv == "1"){
        return (
            <>
                <BsStarFill style={{color: "gold"}} />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
            </>
        )
    }else if(rv == "1.5"){
        return (
            <>
                <BsStarFill style={{color: "gold"}}  />
                <FaStarHalfAlt style={{color: "gold"}}  />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
            </>
        )
    }else if(rv == "2"){
        return (
            <>
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
            </>
        )
    }else if(rv == "2.5"){
        return (
            <>
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <FaStarHalfAlt style={{color: "gold"}}  />
                <BsStarFill />
                <BsStarFill />
            </>
        )
    }else if(rv == "3"){
        return (
            <>
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill />
                <BsStarFill />
            </>
        )
    }else if(rv == "3.5"){
        return (
            <>
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <FaStarHalfAlt style={{color: "gold"}}  />
                <BsStarFill />
            </>
        )
    }else if(rv == "4"){
        return (
            <>
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill />
            </>
        )
    }else if(rv == "4.5"){
        return (
            <>
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <FaStarHalfAlt style={{color: "gold"}}  />
            </>
        )
    }else if(rv == "5"){
        return (
            <>
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
                <BsStarFill style={{color: "gold"}}  />
            </>
        )
    }
  }

  const D_M_R = (e) => {
    const widthArea = 160;
    let offsetY = e.nativeEvent.offsetX;
    let C_A = parseFloat(Math.floor(offsetY / 1.6));

    if(C_A >0 && C_A <= 10){
        //   rate: 0.5
        setDD((obj) => ({...obj, rate: 0.5}))
    }else if(C_A >= 13 && C_A <= 21){
        // rate: 1
        setDD((obj) => ({...obj, rate: 1}))
    }else if (C_A >= 23 && C_A <= 31){
        // rate: 1.5
        setDD((obj) => ({...obj, rate: 1.5}))
    }else if(C_A >= 33 && C_A <= 41){
        // rate: 2
        setDD((obj) => ({...obj, rate: 2}))
    }else if(C_A >= 43 && C_A <= 51){
        // rate: 2.5
        setDD((obj) => ({...obj, rate: 2.5}))
    }else if(C_A >= 53 && C_A <= 61){
        // rate: 3
        setDD((obj) => ({...obj, rate: 3}))
    }else if (C_A >= 63 && C_A <= 71){
        // rate: 3.5
        setDD((obj) => ({...obj, rate: 3.5}))
    }else if(C_A >= 73 && C_A <= 81){
        // rate: 4
        setDD((obj) => ({...obj, rate: 4}))
    }else if(C_A >= 83 && C_A <= 91){
        // date: 4.5
        setDD((obj) => ({...obj, rate: 4.5}))
    }else if(C_A >= 93 && C_A <= 100){
        //  rate: 5
        setDD((obj) => ({...obj, rate: 5}))
    }else if(C_A == 0){
        // rate: 0
        setDD((obj) => ({...obj, rate: 0}))
    }
  }

  const closeR_M = () => {
    if(rel == false)return;
    setRel(() => false)
  }

  // save items to local storage
  localStorage.setItem(`${type.toLowerCase()}List`, JSON.stringify(list));
  localStorage.setItem(`${type.toLowerCase()}Read_Watch`, JSON.stringify(read_watch));
  localStorage.setItem(`${type.toLowerCase()}Fav`, JSON.stringify(favourite));
  localStorage.setItem(`${type.toLowerCase()}Rating`, JSON.stringify(rating));

  return (
    <div className="for_userActions">
        <div className="user_actions_wrap">
            <div  style={isLiked.length > 0 ? {color: 'gold'} : {}} className="user_act_btn" onClick={() => dispatch(add_remove_Like({type: type.toLowerCase(), id}))}><BsList /></div>
            <div style={isFavourite != undefined ? {color: 'gold'} : {}} className="user_act_btn" onClick={() => dispatch(add_remove_favourite({type: type.toLowerCase(), id}))}><BsHeartFill /></div>
            <div style={isRead_Watch != undefined ? {color: 'gold'} : {}} className="user_act_btn" onClick={() => dispatch(add_remove_read_watched({type: type.toLowerCase(), id}))}><BsBookmarkFill /></div>
            <div className="user_act_btn">
                <OutsideClickHandler children={(e) => e.target}  onOutsideClick={(e) => closeR_M()}>
                    <span onClick={() => setRel((bool) => !bool)} className="star_icon_btn">
                        <BsStarFill style={(ratz?.id == id) ? {color: "gold"} : {color: "white"}} />
                    </span>
                    <span style={rel ? {display: "flex"} : {display: "none"}} className="starsBtn_rating_cont">
                        <div className="star_rating_wrap">
                        <div onClick={() => dispatch(removeRating({type: type.toLowerCase(), id}))} className="firstPart_starWrap"><FaMinusCircle /></div>
                        <div onMouseMove={(e) => D_M_R(e)} onMouseLeave={() => setDD((obj) => ({...obj, rate: ""}))} onClick={(e) => ADD_RATE(e, id)} className="secondPart_starWrap">
                            {D_D.rate != "" ? RV(D_D.rate) : (!ratz ? RV(0) : RV(ratz.rate))}
                        </div>
                        </div>
                    </span>
                </OutsideClickHandler>
             
            </div>
        </div>
    </div>
  )
}

export default React.memo(User_Actions)