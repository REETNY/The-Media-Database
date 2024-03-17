import React from 'react';
import { useAnimeSocialsQuery, useMangaSocialsQuery } from '../app/Jikan/jikanSlice';
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useGetReviewQuery } from '../app/Tmdb/TmdbSlice';

const Social_Reviews = ({searchID, RD}) => {

    let REV_DIS;
    let state = "isLoading";
    let errorData;

    const id = searchID

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

    const {
        data: result,
        isLoading,
        isSuccess,
        isError,
        error
    } = (type().includes("manga")) 
    ? useMangaSocialsQuery({id, type: RD.toLowerCase()}) 
    : (type().includes("anime"))
    ? useAnimeSocialsQuery({id, type: RD.toLowerCase()})
    : type().includes("movies")
    ? useGetReviewQuery({id: id, type: "movie"})
    : useGetReviewQuery({id: id, type: "tv"})


    if(isSuccess){
        state = "isSuccess"
        REV_DIS = result?.data || result.results;
    }else if(isLoading){
        state = "isLoading"
    }else if(isError){
        state = "isError"
        errorData = error
    }

    if(state == "isSuccess"){

        let oneRev = ((REV_DIS != undefined) && (type().includes("anime") || type().includes("manga")))
         ? REV_DIS?.filter((item) => item.score > 0 ? item : false)[0]
         : REV_DIS?.filter((item) => item.author_details.rating > 0 ? item : false)[0];
    
        return (
            <>
            {
                (REV_DIS.length > 0 )

                ?
                
                <div className="just_one_review">
                     <div className="reviewers_detz">
                        <div className="reviewers_img_wrap">
                            <img 
                            src={
                                oneRev?.user?.images?.webp?.image_url || `${oneRev.author_details.avatar_path != null ? `https://image.tmdb.org/t/p/w500/${oneRev.author_details.avatar_path}` : `https://ui-avatars.com/api/?background=random&name=${oneRev.author_details.name || oneRev?.author_details.username}`}`} 
                            alt="" 
                        />
                        </div>
                        <div className="reviewers_info_cont">
                            <div className="reviewers_info_head">A Review By {oneRev?.user?.username || oneRev.author}</div>
                            <div className="reviewers_extras_info">
                                <div className="reviewed_star">
                                    <span className="reviewed_icon"><FaStar /></span>
                                    <span className="reviewed_rate_num">{oneRev?.author_details?.rating || oneRev?.score}</span>
                                </div>
                                <div className="reviewedBy_When">Written by {oneRev?.user?.username || oneRev?.author_details.username} on {formatDate(oneRev.date || oneRev?.created_at)}</div>
                            </div>
                        </div>
                     </div>
                     <div className="reviewers_content_data">{oneRev?.review?.slice(0, 700) || oneRev?.content?.slice(0, 700)}...<Link>Read More</Link></div>
                 </div>
                :

                <div style={{marginBottom: "25px"}} className="error_noDataMsg">
                     <i>Nothing to show in here</i>
                </div>
            }
        
            </>
        )
    }else if(state == "isLoading"){
        return <>Loading.........</>
    }

}

export default Social_Reviews