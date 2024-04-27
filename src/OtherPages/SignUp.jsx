import React, { useState, useEffect } from 'react'
import FOIMG1 from "../assets/FormImgs/FormLogo1.webp"
import FOIMG2 from "../assets/FormImgs/FormLogo2.webp"
import FOIMG3 from "../assets/FormImgs/FormLogo3.webp"
import FOIMG4 from "../assets/FormImgs/FormLogo4.webp"
import FOIMG6 from "../assets/FormImgs/FormLogo6.webp"
import { Link } from 'react-router-dom'

const SignUp = () => {

    let formImgArr = [FOIMG1, FOIMG2, FOIMG3, FOIMG4, FOIMG6];

    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        explicitContent: "",
        username: "",
        password: "",
        email: "",
        confirmPass: ""
    });

    const [err, setErr] = useState({
        fnErr: true,
        lnErr: true,
        userErr: true,
        passErr: true,
        emailErr: true,
        confirm: false
    })

    const [CII, setCII] = useState("");

    const keyUp = (e) => {
        setFormState((obj) => {
            return {
                ...obj,
                [e.target.name] : e.target.type == "checkbox" ? e.target.checked : e.target.value
            }
        })
    }

    const checkInp = (e) => {
        if(e.target.name == "email"){
            let emailArg = /^[a-zA-Z]+[a-zA-Z0-9]*@{1}[a-zA-Z]{2,}\.[a-zA-Z]{2,4}$/
            let isTrue = emailArg.test(e.target.value)
            isTrue ? setErr((val) => {
                return {...val, emailErr: false}
            }) : setErr((val) => {
                return {...val, emailErr: true}
            })
        }else if(e.target.name == "firstName"){
            let fnArg = /^[a-zA-Z]{1,}$/
            let isTrue = fnArg.test(e.target.value)
            isTrue ? setErr((val) => {
                return {...val, fnErr: false}
            }) : setErr((val) => {
                return {...val, fnErr: true}
            })
        }else if(e.target.name == "lastName"){
            let lnArg = /^[a-zA-Z]{1,}$/
            let isTrue = lnArg.test(e.target.value)
            isTrue ? setErr((val) => {
                return {...val, lnErr: false}
            }) : setErr((val) => {
                return {...val, lnErr: true}
            })
        }else if(e.target.name == "username"){
            let userArg = /^[a-zA-Z]{4,}[0-9&#$@!]*$/
            let isTrue = userArg.test(e.target.value)
            isTrue ? setErr((val) => {
                return {...val, userErr: false}
            }) : setErr((val) => {
                return {...val, userErr: true}
            })
        }else if(e.target.name == "password"){
            let passArg = /[a-zA-Z0-9&#$@!]{6,}$/
            let isTrue = passArg.test(e.target.value)
            isTrue ? setErr((val) => {
                return {...val, passErr: false}
            }) : setErr((val) => {
                return {...val, passErr: true}
            })
            e.target.value == formState.confirmPass ? setErr((val) => {
                return {...val, confirm: false}
            }) : setErr((val) => {
                return {...val, confirm: true}
            })
        }else if(e.target.name == "confirmPass"){
            e.target.value == formState.password ? setErr((val) => {
                return {...val, confirm: false}
            }) : setErr((val) => {
                return {...val, confirm: true}
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        setCII(Math.floor(Math.random() * 5))
    }, [])

  return (
    <div>
        <section className="signInForm">
            <div className="formDivider">

                <div className="firstSec">
                    <form action="" className="signin">

                        <div className="eachInp">
                            <label htmlFor="fn">First Name</label>
                            <input className={err.fnErr ? "err" : ""} value={formState.firstName} onChange={(e) => {
                                keyUp(e)
                                checkInp(e)
                            }} name='firstName' id='fn' type="text" />
                        </div>

                        <div className="eachInp">
                            <label htmlFor="ln">Last Name</label>
                            <input className={err.lnErr ? "err" : ""} value={formState.lastName} onChange={(e) => {
                                keyUp(e)
                                checkInp(e)
                            }} name='lastName' id='ln' type="text" />
                        </div>

                        <div className="eachInp">
                            <label htmlFor="email">Email</label>
                            <input className={err.emailErr ? "err" : ""} value={formState.email} onChange={(e) => {
                                keyUp(e)
                                checkInp(e)
                                }} name='email' id='email' type="text" />
                        </div>

                        <div className="exContentInp">
                            <span className="switchContent">Do you like explicit content?</span>
                            <label htmlFor="explicitContent" className='explicitContent'>
                                <input value={formState.explicitContent} onChange={(e) => keyUp(e)} type="checkbox" name="explicitContent" id="explicitContent" />
                                <div className="roundedBtn"></div>
                            </label>
                        </div>

                        <div className="eachInp">
                            <label htmlFor="username">Username</label>
                            <input className={err.userErr ? "err" : ""} value={formState.username} onChange={(e) => {
                                keyUp(e)
                                checkInp(e)
                            }} name='username' id='username' type="text" />
                        </div>

                        <div className="eachInp">
                            <label htmlFor="password">Password</label>
                            <input className={err.passErr ? "err" : ""} value={formState.password} onChange={(e) => {
                                keyUp(e)
                                checkInp(e)
                            }} name='password' id='password' type="text" />
                        </div>

                        <div className="eachInp">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input value={formState.confirmPass} onChange={(e) => {
                                keyUp(e)
                                checkInp(e)
                            }} className={err.confirm ? "err" : ""} name='confirmPass' id='confirmPassword' type="text" />
                        </div>

                        <button className='btnOnSubmit' onClick={(e) => onSubmit(e)}>SignUp</button>

                    </form>
                </div>

                <div className="secondSec">
                    <div className="formImg">
                        <img src={formImgArr[CII]} alt="" />
                    </div>
                    <div className="alreadyDiv">
                        already have an account? <span className="movePage"><Link to={"/signin"} >Signin Here!</Link></span>
                    </div>
                </div>

            </div>
        </section>
    </div>
  )
}

export default SignUp