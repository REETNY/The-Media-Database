import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdHeart } from 'react-icons/io';
import { FaStarHalfAlt, FaStar, FaListAlt, FaEye } from "react-icons/fa";
import { add_remove_Like, add_remove_favourite, addRating, add_remove_read_watched, MangaDatas, AnimeDatas, MoviesData, TVData } from '../app/AppFunctions/DataDetzSlice';

const DataSettings1 = (props) => {

    const {id} = props.file

    const type = () => {
        let url = location.pathname;
        if(url.includes("manga")){
            return 'manga'
        }else if(url.includes("anime")){
            return "anime"
        }else if(url.includes("movies")){
            return "movies"
        }else if(url.includes("tv")){
            return "tv"
        }
    }

    let dispatch = useDispatch()

    let {list, favourite, read_watch, rating} = useSelector(
        type() == "manga" ? MangaDatas 
        : type() == "anime"
        ? AnimeDatas
        : type() == "movies"
        ? MoviesData
        : TVData
    )

    const isLiked = list?.filter((item) => item.id == id ? item : false);
    const isFavourite = favourite?.find((item) => item.id == id);
    const isRead_Watch = read_watch?.find((item) => item.id == id);
    const ratz = rating?.find((item) => item.id == id)

    let [Menu, setMenu] = useState(false);

    let [dummyData, setDummyData] = useState(0);

    const RV = (num) => {

        let rv = num;

        if(rv == "0"){
            return (
                <span className='expandStars Nostars'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </span>
            )
        }else if(rv == "0.5"){
            return (
                <span className='expandStars Hstars'>
                    <FaStarHalfAlt style={{color: "gold"}} />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </span>
            )
        }else if(rv == "1"){
            return (
                <span className='expandStars Hstars'>
                    <FaStar style={{color: "gold"}} />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </span>
            )
        }else if(rv == "1.5"){
            return (
                <span className='expandStars Hstars'>
                    <FaStar style={{color: "gold"}}  />
                    <FaStarHalfAlt style={{color: "gold"}}  />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </span>
            )
        }else if(rv == "2"){
            return (
                <span className='expandStars Hstars'>
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </span>
            )
        }else if(rv == "2.5"){
            return (
                <span className='expandStars Hstars'>
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStarHalfAlt style={{color: "gold"}}  />
                    <FaStar />
                    <FaStar />
                </span>
            )
        }else if(rv == "3"){
            return (
                <span className='expandStars Hstars'>
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar />
                    <FaStar />
                </span>
            )
        }else if(rv == "3.5"){
            return (
                <span className='expandStars Hstars'>
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStarHalfAlt style={{color: "gold"}}  />
                    <FaStar />
                </span>
            )
        }else if(rv == "4"){
            return (
                <span className='expandStars Hstars'>
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar />
                </span>
            )
        }else if(rv == "4.5"){
            return (
                <span className='expandStars Hstars'>
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStarHalfAlt style={{color: "gold"}}  />
                </span>
            )
        }else if(rv == "5"){
            return (
                <span className='expandStars Hstars'>
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                    <FaStar style={{color: "gold"}}  />
                </span>
            )
        }
    }

    const openMenu = () => {
        setMenu((val) => !val)
    }

    const rateHelper = (e) => {
        let num = parseFloat(Math.floor(e.nativeEvent.offsetX / 1.44));

        if(num >0 && num <= 10){
            dispatch(addRating({type: type(), id, rate: 0.5}))
        }else if(num >= 13 && num <= 21){
            dispatch(addRating({type: type(), id, rate: 1}))
        }else if (num >= 23 && num <= 31){
            dispatch(addRating({type: type(), id, rate: 1.5}))
        }else if(num >= 33 && num <= 41){
            dispatch(addRating({type: type(), id, rate: 2}))
        }else if(num >= 43 && num <= 51){
            dispatch(addRating({type: type(), id, rate: 2.5}))
        }else if(num >= 53 && num <= 61){
            dispatch(addRating({type: type(), id, rate: 3}))
        }else if (num >= 63 && num <= 71){
            dispatch(addRating({type: type(), id, rate: 3.5}))
        }else if(num >= 73 && num <= 81){
            dispatch(addRating({type: type(), id, rate: 4}))
        }else if(num >= 83 && num <= 91){
            dispatch(addRating({type: type(), id, rate: 4.5}))
        }else if(num >= 93 && num <= 100){
            dispatch(addRating({type: type(), id, rate: 5}))
        }else if(num == 0){
            dispatch(addRating({type: type(), id, rate: 0}))
        }

    }

    const dummyRate = (e) => {
        let num = parseFloat(Math.floor(e.nativeEvent.offsetX / 1.44));
        
        if(num >0 && num <= 10 && dummyData != 0.5){
            setDummyData(0.5)
        }else if(num >= 13 && num <= 21 && dummyData != 1){
            setDummyData(1)
        }else if (num >= 23 && num <= 31 && dummyData != 1.5){
            setDummyData(1.5)
        }else if(num >= 33 && num <= 41 && dummyData != 2){
            setDummyData(2)
        }else if(num >= 43 && num <= 51 && dummyData != 2.5){
            setDummyData(2.5)
        }else if(num >= 53 && num <= 61 && dummyData != 3){
            setDummyData(3)
        }else if (num >= 63 && num <= 71 && dummyData != 3.5){
            setDummyData(3.5)
        }else if(num >= 73 && num <= 81 && dummyData != 4){
            setDummyData(4)
        }else if(num >= 83 && num <= 91 && dummyData != 4.5){
            setDummyData(4.5)
        }else if(num >= 93 && num <= 100 && dummyData != 5){
            setDummyData(5)
        }else if(num == 0 && dummyData != 0){
            setDummyData(0)
        }
    }

    const menuOpener = (e) => {
        let conts = document.querySelectorAll(".setting");
        conts.forEach((item) => {
            if(item != e.target.nextSibling){
                item.classList.remove("open");
            }
        })

        e.target.nextSibling.classList.contains("open") ? e.target.nextSibling.classList.remove("open") : e.target.nextSibling.classList.add("open")

    }

    // save items to local storage
    localStorage.setItem(`${type().toLowerCase()}List`, JSON.stringify(list));
    localStorage.setItem(`${type().toLowerCase()}Read`, JSON.stringify(read_watch));
    localStorage.setItem(`${type().toLowerCase()}Fav`, JSON.stringify(favourite));
    localStorage.setItem(`${type().toLowerCase()}Rating`, JSON.stringify(rating));

  return (
    <div className="settings" >
        <div className="btnImg" onClick={(e) => menuOpener(e)} >
            <span className="dots">...</span>
        </div>

        <div className="setting">

            <div className="isUserSettz">
                <div className={isLiked.length > 0 ? "addToList setBtn active" : "addToList setBtn"} onClick={() => dispatch(add_remove_Like({type: type(), id}))}><span className='menuIcon'><FaListAlt /></span>Add to List</div>

                <div className={isFavourite != undefined ? "addFavourite setBtn active" : "addFavourite setBtn"} onClick={() => dispatch(add_remove_favourite({type: type(), id}))} ><span className='menuIcon'><IoMdHeart /></span> Favourite</div>

                <div className={isRead_Watch != undefined ? "addWatchLater setBtn active" : "addWatchLater setBtn"}  onClick={() => dispatch(add_remove_read_watched({type: type(), id}))} ><span className='menuIcon'><FaEye /></span>{type() == "manga" ? "Read" : "Watched"}</div>

                <div onClick={() => openMenu()} className={ratz ? "yourRating setBtn active" : "yourRating setBtn"}>
                    <span className={ratz ? 'menuIcon' : "menuIcon"}><FaStar /></span>
                    <span className="ratingMenu">Your Rating</span>
                </div>

                <div className={Menu ? `pleaseRateStars opened` : "pleaseRateStars"}>
                    <div onMouseMove={(e) => dummyRate(e)} onMouseLeave={() => setDummyData(0)} onClick={(e) => rateHelper(e)} className="measureWidth">{dummyData != 0 ? RV(dummyData) : !ratz ? RV(0) : RV(ratz.rate)}</div>
                    <div className="starBtnClicker"></div>
                </div>
            </div>


        </div>

    </div>

  )
}

export default React.memo(DataSettings1)