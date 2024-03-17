import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

const Ani_Mag = () => {

  let data = useOutletContext()

  return (
    <section>
      <Outlet context={data} />
    </section>
  )
}

export default Ani_Mag