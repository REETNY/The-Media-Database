import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetFullAnimeQuery, useGetFullMangaQuery, useAnimeSocialsQuery, useMangaSocialsQuery } from '../app/Jikan/jikanSlice'
import { FaStar } from 'react-icons/fa' 
import { useGetMoviesByIdQuery, useGetReviewQuery } from '../app/Tmdb/TmdbSlice'


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
  } = 
  type == "anime"
  ? useAnimeSocialsQuery({id: ID, type: "reviews"})
  : type == "manga"
  ? useMangaSocialsQuery({id: ID, type: "reviews"})
  : type == "movie"
  ? useGetReviewQuery({id: ID, type})
  : type == "tv"
  ? useGetReviewQuery({id: ID, type})
  : ""

  const {
    isFetching : isFetch,
    isLoading: isLoad,
    isSuccess: isSucceed,
    isError: isFailed,
    error: failResult,
    data: resul
  } = 
  type == "anime"
  ? useGetFullAnimeQuery(ID)
  : type == "manga"
  ? useGetFullMangaQuery(ID)
  : type == "movie"
  ? useGetMoviesByIdQuery({id: ID, type})
  : type == "tv"
  ? useGetMoviesByIdQuery({id: ID, type})
  : ""


  const formatDate = (date) => {
    let dateData = new Date(date);
    let year = dateData.getFullYear();
    let month = dateData.getMonth();
    let day = dateData.getDate();

    const mthArr = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${mthArr[month]} ${day}, ${year}`
  }

  let imgFile = ""
  let titlFile = ""

  if(type == "anime" || type == "manga"){
   imgFile = ""
  }else{
    imgFile = `https://image.tmdb.org/t/p/w500${resul?.poster_path}`;
    titlFile = resul?.title
  }

  let userComment = [];

  if(!isFetching && result && isSuccess && !isError){
    userComment = 
    (type == "anime" || type == "manga") 
    ? result?.data ? result.data.filter((item) => item.mal_id == personID ? item : false) : []
    : result?.results ? result?.results.filter((item) => item.id == personID ? item : false) : []
  }

  return (
    <div className="mainUserReview">

      <div className="userReviewBack">
        <div className="user_full_reviewer">
          <img src={imgFile} alt="" />
        </div>
      </div>

      <div className="userReviewContent">
        <div className="userReview_topic">{titlFile}</div>
        {
          userComment.map((item, index) => {
            if(type == "anime" || type == "manga"){
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
            }
            if(type == "movie" || type == "tv"){
              let malId = id + "-" + item.id;
              let author = item.author;
              let { avatar_path, name, username} = item.author_details;
              let rating = item?.author_details?.rating == null ? 0 : item?.author_details?.rating;
              let content = item?.content;
              let up_date = item?.updated_at;
              let date = item?.created_at;
              return(
                <div key={index} className="just_one_review">
                  <div className="reviewers_detz">
                      <div className="reviewers_img_wrap">
                          <img src={avatar_path == null ?  `https://ui-avatars.com/api/?background=random&name=${author || username}` : `https://image.tmdb.org/t/p/w500${avatar_path}`} alt="" />
                      </div>
                      <div className="reviewers_info_cont">
                          <div className="reviewers_info_head">A Review By {author}</div>
                          <div className="reviewers_extras_info">
                              <div className="reviewed_star">
                                  <span className="reviewed_icon"><FaStar /></span>
                                  <span className="reviewed_rate_num">{rating == 10 ? rating : rating.toFixed(1)}</span>
                              </div>
                              <div className="reviewedBy_When">Written by {username} on {formatDate(date)}</div>
                          </div>
                      </div>
                  </div>
                  <div className="reviewers_content_data">{content}</div>
                  <div className="reviewers_content_updateAt">updated @ {formatDate(up_date)}</div>
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default Read_Reviews