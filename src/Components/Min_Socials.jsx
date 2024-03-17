import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import Social_Discuss from '../Components2/Social_Discuss'
import Social_Reviews from '../Components2/Social_Reviews'

const Min_Socials = (props) => {

    const {id} = props.data

    const [R_D, setR_D] = useState({
        choice: "Reviews",
    });

    const type = () => {
        let url = location.pathname;
        return(url);
    }

    const changeChoice = ({type}) => {
        if(type == R_D.choice)return;
        setR_D((obj) => ({...obj, choice: type}))
    }


    return (
        <div className="socials_cont_wrapper">
    
            <div className="socials_cont_head_wrap">
                <div className="text_head_cont">Socials</div>
                <div className="nav_head_cont">
                    <span onClick={() => changeChoice({type: 'Reviews'})} className={R_D.choice == "Reviews" ? "each_min_nav open" : "each_min_nav"}>Reviews</span>
                    {(type().includes("manga") || type().includes("anime")) ? "" : <span onClick={() => changeChoice({type: 'Discussions'})} className={R_D.choice == "Discussions" ? "each_min_nav open" : "each_min_nav"}>Discussions</span>}
                </div>
            </div>
    
            <div className="socials_cont_content_wrap">
                {
                    R_D.choice == "Reviews" 
                    ? <Social_Reviews searchID={id} RD={R_D.choice} />
                    : <Social_Discuss searchID={id} RD={R_D.choice} />
                }
            </div>
    
            <div className="full_to_content_area">
                <Link>{R_D.choice == "Reviews" ? "Read All Reviews" : "Go to Discussions"}</Link>
            </div>
    
        </div>
    )



}

export default Min_Socials