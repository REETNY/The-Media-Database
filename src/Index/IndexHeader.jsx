import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { funcHam, hamBoolean } from '../app/Navigation/NavSlice';
import { useDispatch } from 'react-redux';
import { isLoggedState } from '../app/User/AuthenticationSlice';
import { addNewRouteMv_Tv, saveUrl, setBtnQuery } from '../app/Oth/FilterSlice1';

const IndexHeader = () => {
  const hamBool = useSelector(hamBoolean)
  const isSignedIn = useSelector(isLoggedState)
  const dispatch = useDispatch()
  const [openMenu, setMenu] = useState(false)


  const RouteChange = () => {
    dispatch(saveUrl(""))
    dispatch(setBtnQuery(false))
  }

  return (
  <div className='indexHeader'>
    <header>
      <div className="navLogo">MY LOGO</div>

      <div className="navItems">

        <ul className="navLinks">
          <NavLink onClick={() => RouteChange()} className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="/" >Home</NavLink>
          <NavLink onClick={() => RouteChange()} className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="anime">Anime</NavLink>

          <div className="movies_link">
            <span className="mov_lin_text">Movies</span>
            <span className="mov_link">
              
              <NavLink 
                onClick={() => {
                  RouteChange()
                  dispatch(addNewRouteMv_Tv("popular"))
                }} 
                className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} 
                to="movies/popular"
              >
                popular
              </NavLink>

              <NavLink 
                onClick={() => {
                  RouteChange()
                  dispatch(addNewRouteMv_Tv("now_playing"))
                }} 
                className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} 
                to="movies/now_playing"
              >
                Now Playing
              </NavLink>

              <NavLink 
                onClick={() => {
                RouteChange()
                dispatch(addNewRouteMv_Tv("upcoming"))
                }} 
                className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} 
                to="movies/upcoming"
              >
                UpComing
              </NavLink>

              <NavLink 
                onClick={() => {
                  RouteChange()
                  dispatch(addNewRouteMv_Tv("top_rated"))
                }} 
                className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} 
                to="movies/top_rated"
              >
                Top Rated
              </NavLink>

            </span>
          </div>

          <div className="movies_link">
            <span className="mov_lin_text">TV Shows</span>
            <span className="mov_link">
              <NavLink onClick={() => RouteChange()} className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="tv/popular">popular</NavLink>
              <NavLink onClick={() => RouteChange()} className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="tv/airing_today">Airing Today</NavLink>
              <NavLink onClick={() => RouteChange()} className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="tv/on_the_air">On the air</NavLink>
              <NavLink onClick={() => RouteChange()} className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="tv/top_rated">Top Rated</NavLink>
            </span>
          </div>
          
          <NavLink onClick={() => RouteChange()} className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="manga">Manga</NavLink>
          <NavLink onClick={() => RouteChange()} style={isSignedIn ? {display: "none"} : {display: ""}} className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="signin">Signin</NavLink>
        </ul>

        <div style={!isSignedIn ? {display: "none"} : {display: "block"}} onClick={() => setMenu((val) => !val)} className={openMenu ? "userDef open" : "userDef"}>
          <div className="userAvatar"></div>
          <div className="userLinks">
            <ul className="uLinks">
              <NavLink onClick={() => RouteChange()} >My Profile</NavLink>
              <NavLink onClick={() => RouteChange()} >Menu</NavLink>
              <NavLink onClick={() => RouteChange()} >Settings</NavLink>
              <NavLink onClick={() => RouteChange()} >Log Out</NavLink>
            </ul>
          </div>
        </div>
        
        <div onClick={() => {
          dispatch(funcHam())
          }
          } className={hamBool ? "hamBtn opened" : "hamBtn"}>
          <div className="hamLine"></div>
          <div className="hamLine"></div>
          <div className="hamLine"></div>
        </div>

      </div>
    </header>

    <div className={hamBool ? `hamLinkCont open` : `hamLinkCont`}>
      <div className="hamLinks">
        <ul className="LinkXS">
          <NavLink onClick={() => {
            dispatch(funcHam())
            RouteChange()
            }
            } className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="/" >Home</NavLink>
          <NavLink onClick={() => {
            dispatch(funcHam())
            RouteChange()
            }
            } className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="anime">Anime</NavLink>
          <NavLink onClick={() => {
            dispatch(funcHam())
            RouteChange()
            }
            } className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="manga">Manga</NavLink>
          <NavLink onClick={() => {
            dispatch(funcHam())
            RouteChange()
            }
            } style={isSignedIn ? {display: "none"} : {display: ""}} className={({isActive}) => isActive ? "isActiveLink" : "notActiveLink"} to="signin">Signin</NavLink>
        </ul>
      </div>
    </div>

  </div>
  )
}

export default IndexHeader