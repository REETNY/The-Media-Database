import './App.css'
import { createBrowserRouter, RouterProvider, Routes, Route, createRoutesFromElements, redirect } from 'react-router-dom'
import IndexLayOut from './Index/indexLayOut'
import IndexPage from './Index/IndexPage'
import SignUp from './OtherPages/SignUp'
import SignIn from './OtherPages/SignIn'
import AnimeLayOut from './Anime/AnimeLayOut'
import AnimeIndex from './Anime/AnimeIndex'
import MangaLayOut from './Manga/MangaLayOut'
import MangaIndex from './Manga/MangaIndex'
import NotFound from './OtherPages/NotFound'

import { useSelector } from 'react-redux/es/hooks/useSelector'
import { isLoggedState } from './app/User/AuthenticationSlice'

import Ani_Mag_Layout from './Viewers/Ani_Mag/Ani_Mag_Layout'
import Ani_Mag from './Viewers/Ani_Mag/Ani_Mag'

import AM_Index from './Viewers/Ani_Mag/Pages/AM_Index'

import $ from 'jquery';
window.$ = $;


import AM_Casts from './Viewers/Ani_Mag/Pages/AM_Casts'
import AM_Titles from './Viewers/Ani_Mag/Pages/AM_Titles'
import AM_Release from './Viewers/Ani_Mag/Pages/AM_Release'
import AM_Backdrop from './Viewers/Ani_Mag/Pages/AM_Backdrop'
import AM_Videos from './Viewers/Ani_Mag/Pages/AM_Videos'
import AM_Logos from './Viewers/Ani_Mag/Pages/AM_Logos'
import AM_Posters from './Viewers/Ani_Mag/Pages/AM_Posters'
import AM_Reviews from './Viewers/Ani_Mag/Pages/AM_Reviews'
import Read_Reviews from './Viewers/Read_Reviews'
import MoviesLayout from './Movies/MoviesLayout'

import { useGetLocationQuery } from './app/Oth/IPSlice'

// (Optional) Import component styles. If you are using Less, import the `index.less` file. 
import "rsuite/DatePicker/styles/index.css";
import 'rsuite/RangeSlider/styles/index.css';
import 'rsuite/SelectPicker/styles/index.css';
import 'rsuite/TagPicker/styles/index.css';
import 'rsuite/Checkbox/styles/index.css';
import MoviesIndex from './Movies/MoviesIndex'
import Mov_Series_Layout from './Viewers/Mov_Series/Mov_Series_Layout'
import MT_Index from './Viewers/Mov_Series/Pages/MT_Index'


function App() {

  const isLogged = useSelector(isLoggedState)

  const cj = () => {
    if(!isLogged) throw redirect("/signin")
  }

  const routerEl = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<IndexLayOut />} >
      <Route index element={<IndexPage />} />

      <Route path='signin' element={<SignIn />} />

      <Route path='signup' element={<SignUp />} />

      <Route path='anime' element={<AnimeLayOut />}>
        <Route index element={<AnimeIndex />} />
      </Route>

      <Route path='manga' element={<MangaLayOut />}>
        <Route index element={<MangaIndex />} />
      </Route>

      <Route path='movies/:option' element={<MoviesLayout />} >
        <Route index element={<MoviesIndex />} />
      </Route>

      <Route path='tvshow/:option' element={<></>} >
        <Route index element={<></>} />
      </Route>

      {
        ["/manga/:id", "/anime/:id"].map((item, index) => {
          return(
            <Route path={item} element={<Ani_Mag_Layout />} key={index}>

              <Route path='' element={<Ani_Mag />}>
                <Route index element={<AM_Index />} />
                <Route path='casts' element={<AM_Casts />} />
                <Route path='titles' element={<AM_Titles />} />
                <Route path='dates' element={<AM_Release />} />
                <Route path='translation' element={<>Index of translation</>} />
              </Route>

              <Route path='images' element={<Ani_Mag />}>
                <Route path='backdrops' element={<AM_Backdrop />} />
                <Route path='logos' element={<AM_Logos />} />
                <Route path='posters' element={<AM_Posters />} />
                <Route path='videos' element={<AM_Videos />} />
              </Route>

              <Route path='reviews' element={<Ani_Mag />}>
                <Route index element={<AM_Reviews />} />
                
              </Route>

            </Route>
          )
        })
      }

      {
        ["/movies/:option/:id", "/tvshow/:option/:id"].map((item, index) => {
          return(
            <Route path={item} element={<Mov_Series_Layout />} key={index}>

              <Route path='' element={<Ani_Mag />}>
                <Route index element={<MT_Index />} />
                <Route path='casts' element={<AM_Casts />} />
                <Route path='titles' element={<AM_Titles />} />
                <Route path='dates' element={<AM_Release />} />
                <Route path='translation' element={<>Index of translation</>} />
              </Route>

              {/* <Route path='images' element={<Ani_Mag />}>
                <Route path='backdrops' element={<AM_Backdrop />} />
                <Route path='logos' element={<AM_Logos />} />
                <Route path='posters' element={<AM_Posters />} />
                <Route path='videos' element={<AM_Videos />} />
              </Route>

              <Route path='reviews' element={<Ani_Mag />}>
                <Route index element={<AM_Reviews />} />
                
              </Route> */}

            </Route>
          )
        })
      }

      <Route path=':type/reviews/:id' element={<Read_Reviews />} />

      <Route path='*' element={<NotFound />} />

    </Route>
  ))

  return (
   <RouterProvider router={routerEl} />
  )
}

export default App
