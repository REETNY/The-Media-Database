import React from 'react'

const Social_Discuss = ({searchID}) => {

    const type = () => {
        let url = location.pathname;
        return(url);
    }

    const formatDate = (date) => {
        let dateData = new Date(date);
        let year = dateData.getFullYear();
        let month = dateData.getMonth();
        let day = dateData.getDate();

        const mthArr = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return `${mthArr[month]} ${day}, ${year}`
    }

    if(state == "isError" && R_D.choice == "Discussions"){
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
                       R_D.choice == "Discussions" 
                       ?
                        <div className="errorLogger">
                            
                            {(errorData.data.message)}
                        </div>
                       :
    
                       ""
                    }
                </div>
        
                <div className="full_to_content_area">
                    <Link>{R_D.choice == "Reviews" ? "Read All Reviews" : "Go to Discussions"}</Link>
                </div>
        
            </div>
        )
      }
  return (
    <div>Social_Discuss</div>
  )
}

export default Social_Discuss