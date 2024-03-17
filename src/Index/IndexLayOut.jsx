import React from 'react'
import { Outlet } from 'react-router-dom'
import IndexFooter from './IndexFooter'
import IndexHeader from './IndexHeader'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { hamBoolean } from '../app/Navigation/NavSlice'
import {Box} from '@mui/material'

const IndexLayOut = () => {

  const hamBool = useSelector(hamBoolean);
  const bodyElTag = document.body

  // if(hamBool){
  //   bodyElTag.style.overflow = "hidden"
  //   console.log(bodyElTag);
  // }else{
  //   bodyElTag.style.overflowY = "auto"
  //   console.log(hamBool);
  // }


  return (
    <section className={hamBool ? "mainOverBody hamIsOpened" : "mainOverBody"}>
      <Box sx={{ minHeight: '100vh', width: "100%", display: "grid", gridTemplateRows: "60px 1fr 70px", gridTemplateColumns: "1fr" }}>
          <IndexHeader />
          <Outlet />
          <IndexFooter />
      </Box>
    </section>
  )
}

export default IndexLayOut