import React from 'react'
import { Outlet } from 'react-router-dom'
import Header1 from '../Components/Header1'
import { changeOpenFil } from '../app/AppFunctions/headerFuncs'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { BtnQueryReady, saveUrl, setBtnQuery, intersect } from '../app/Oth/FilterSlice1'

const Tv_Layout = () => {
  let dispatch = useDispatch();
  let isBtnReady = useSelector(BtnQueryReady)
  let intBtn = useSelector(intersect);

  function takeQuery(){
    let SP = location.search
    let refinedUrl = (SP);

    dispatch(saveUrl(`${refinedUrl}`))
    dispatch(setBtnQuery({val: false}))
  }

  // functiom to check for clicks
  const contClick = (e) => {
    let even = e.target.classList
    if(even.contains("setBtn") || even.contains("ratingMenu") || even.contains("starBtnClicker") || even.contains("measureWidth"))return;
    let conts = document.querySelectorAll(".setting");

    if(conts.length != 0 || conts != null){
      if(!e.target.classList.contains("btnImg")){
        conts.forEach((item) => {
          item.classList.remove("open");  
        })
      }
    }

  }

  return (
    <section onClick={(e) => contClick(e)} className="innerOutlet">
      <Header1 TK={takeQuery} />
      <Outlet />
      <div onClick={() => dispatch(changeOpenFil())} className="buttonXs">filter</div>
      <div style={intBtn ? {opacity: "0"} : {opacity: "1"}} className={isBtnReady ? "btnSearch active" : "btnSearch"}>
        <button onClick={() => takeQuery()}>Search</button>
      </div>
    </section>
  )
}

export default Tv_Layout