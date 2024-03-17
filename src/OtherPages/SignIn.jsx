import React from 'react'
import { useState } from 'react'
import FOIMG1 from "../assets/FormImgs/FormLogo1.webp"
import FOIMG2 from "../assets/FormImgs/FormLogo2.webp"
import FOIMG3 from "../assets/FormImgs/FormLogo3.webp"
import FOIMG4 from "../assets/FormImgs/FormLogo4.webp"
import FOIMG6 from "../assets/FormImgs/FormLogo6.webp"
import { Link } from 'react-router-dom'

const SignIn = () => {

    let formImgArr = [FOIMG1, FOIMG2, FOIMG3, FOIMG4, FOIMG6];

    const [formState, setFormState] = useState({
        username: "",
        password: "",
    })

    const keyUp = (e) => {
        setFormState((obj) => {
            return {
                ...obj,
                [e.target.name] : e.target.value
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <div>
        <section className="signInForm">
            <div className="formDivider">

                <div className="firstSec">
                    <form action="" className="signin">

                        <div className="eachInp">
                            <label htmlFor="username">Username</label>
                            <input value={formState.username} onChange={(e) => keyUp(e)} name='username' id='username' type="text" />
                        </div>

                        <div className="eachInp">
                            <label htmlFor="password">Password</label>
                            <input value={formState.password} onChange={(e) => keyUp(e)} name='password' id='password' type="text" />
                        </div>

                        <button className='btnOnSubmit' onClick={(e) => onSubmit(e)}>SignIn</button>

                    </form>
                </div>

                <div className="secondSec">
                    <div className="formImg">
                        <img src={formImgArr[Math.floor(Math.random() * 5)]} alt="" />
                    </div>
                    <div className="alreadyDiv">
                        don't have an account yet? <span className="movePage"><Link to={"/signup"} >Create an account</Link></span>
                    </div>
                </div>

            </div>
        </section>
    </div>
  )
}

export default SignIn