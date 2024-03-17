import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetFullAnimeQuery, useGetFullMangaQuery, useAnimeSocialsQuery, useMangaSocialsQuery } from '../app/Jikan/jikanSlice'
import { FaStar } from 'react-icons/fa' 


const Read_Reviews = () => {

  const { id, type} = useParams()
  
  const ID = id.split("-")[0]

  const personID = id.split("-")[1]

  const {
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
    data: result
  } = type == "anime"
  ? useAnimeSocialsQuery({id: ID, type: "reviews"})
  : useMangaSocialsQuery({id: ID, type: "reviews"})

  const {
    isFetching : isFetch,
    isLoading: isLoad,
    isSuccess: isSucceed,
    isError: isFailed,
    error: failResult,
    data: resul
  } = type == "anime"
  ? useGetFullAnimeQuery(ID)
  : useGetFullMangaQuery(ID)


  const formatDate = (date) => {
    let dateData = new Date(date);
    let year = dateData.getFullYear();
    let month = dateData.getMonth();
    let day = dateData.getDate();

    const mthArr = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${mthArr[month]} ${day}, ${year}`
  }

  let userComment = [];

  if(!isFetching && result?.data.length > 0){
    userComment = result?.data && result.data.filter((item) => item.mal_id == personID ? item : false)
  }

  return (
    <div className="mainUserReview">
      <div className="userReviewBack"></div>
      <div className="userReviewContent">
        {
          userComment.map((item, index) => {
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
                <div className="reviewers_content_data">{item?.review}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Read_Reviews