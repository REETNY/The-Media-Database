import React from 'react'
import AM_Header from '../../../Components2/AM_Header'
import { useSelector } from 'react-redux'
import { rgbColor } from '../../../app/AppFunctions/colorPicker';
import { useAnimeSocialsQuery, useMangaSocialsQuery } from '../../../app/Jikan/jikanSlice';
import Types from '../../../Customs/Types';
import { Link, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; 

const AM_Reviews = () => {

    let {id} = useParams()

    const formatDate = (date) => {
        let dateData = new Date(date);
        let year = dateData.getFullYear();
        let month = dateData.getMonth();
        let day = dateData.getDate();

        const mthArr = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return `${mthArr[month]} ${day}, ${year}`
    }

    let bgClir = useSelector(rgbColor);

    let typs = Types(location.pathname)

    const {
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        data: result
    } = typs == "anime"
    ? useAnimeSocialsQuery({id, type: "reviews"})
    : useMangaSocialsQuery({id, type: "reviews"})

    let reviews_discuss = []

    if(!isFetching && result.data.length > 0){
        reviews_discuss = result?.data?.map((item, index) => {

            let malId = id + "-" +item.mal_id;

            console.log(malId);

            return(
                <div key={index} className="just_one_review">
                    <div className="reviewers_detz">
                        <div className="reviewers_img_wrap">
                            <img src={item?.user?.images?.webp?.image_url} alt="" />
                        </div>
                        <div className="reviewers_info_cont">
                            <div className="reviewers_info_head">A Review By {item?.user?.username}</div>
                            <div className="reviewers_extras_info">
                                <div className="reviewed_star">
                                    <span className="reviewed_icon"><FaStar /></span>
                                    <span className="reviewed_rate_num">{item?.score == 10 ? item?.score : item?.score.toFixed(1)}</span>
                                </div>
                                <div className="reviewedBy_When">Written by {item?.user?.username} on {formatDate(item.date)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="reviewers_content_data">{item?.review.slice(0, 1000)} {item?.review.length > 1000 && (".......")} {item?.review.length > 1000 && <Link to={`/${typs}/reviews/${malId}`} >Read the rest</Link>}</div>
                </div>
            )
        })
    }

  return (
    <div className="AM_Reviews_Page">
        <AM_Header bgClr={bgClir} />
        <section className="am_review_body">
            <div className="forUnknown"></div>
            <div className="forAmReview">
                {reviews_discuss}
            </div>
        </section>
    </div>
  )
}

export default AM_Reviews