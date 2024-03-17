import React from 'react'
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaBookmark, FaCalendar } from 'react-icons/fa';
import { add_remove_Like, add_remove_favourite, addRating, add_remove_read_watched, MangaDatas, AnimeDatas, MoviesData, TVData } from '../app/AppFunctions/DataDetzSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Recom_View = (props) => {
    const {entry, votes, backdrop_path, id, title, vote_average} = props.data;

    const type = () => {
        const url = location.pathname;
        if(url.includes("manga")){
            return "manga"
        }else if(url.includes("anime")){
            return "anime"
        }else if(url.includes("movies")){
            return "movies"
        }else{
            return "tv"
        }
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()

    let {list, favourite, read_watch, rating} = useSelector(
        type() == "manga" 
        ? MangaDatas 
        : type() == "anime"
        ? AnimeDatas
        : type() == "movies"
        ? MoviesData
        : TVData
    )

    const isFavourite = favourite?.find((item) => item.id == (entry != undefined ? entry.mal_id : id));
    const isRead_Watch = read_watch?.find((item) => item.id == (entry != undefined ? entry.mal_id : id));
    const ratz = rating?.find((item) => item.id == (entry != undefined ? entry.mal_id : id))

    const moveTo = ({id}) => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        navigate(`/${type()}/${id}`);
    }


    // save items to local storage
    localStorage.setItem(`${type()}List`, JSON.stringify(list));
    localStorage.setItem(`${type()}Read`, JSON.stringify(read_watch));
    localStorage.setItem(`${type()}Fav`, JSON.stringify(favourite));
    localStorage.setItem(`${type()}Rating`, JSON.stringify(rating));

  return (
    <div style={{width: "280px"}}>
        <div className="recomm_itemz">

            
            <div className="recomm_itemz_1">
                <Link to={`../${type()}/${entry == undefined ? id : entry.mal_id}`} >
                    <div className="wrap_itemz_1_cont">
                        <div className="recomm_itemz_hero">
                            <img src={entry != undefined ? entry.images.webp.image_url : `https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt="" className="item_hero_recomm" />
                        </div>
                    </div>
                </Link>
                
                <div className="recommend_user_func">
                    <div className="release_recom_date">
                        <div className="release_recom_icon"><FaCalendar /></div>
                        <div className="release_recom">10/10/2024</div>
                    </div>
                    <div className="recomm_functions">
                        <span style={isFavourite ? {color: "gold"} : {}} onClick={() => dispatch(add_remove_favourite({type: type(), id: entry == undefined ? id : entry.mal_id}))}>
                            <FaHeart />
                        </span>
                        <span style={isRead_Watch ? {color: "gold"} : {}} onClick={() => dispatch(add_remove_read_watched({type: type(), id: entry == undefined ? id : entry.mal_id}))}>
                            <FaBookmark />
                        </span>
                        <span onClick={() => moveTo({id: entry == undefined ? id : entry.mal_id})} style={ratz ? {color: "gold"} : {}}>
                            <FaStar />
                        </span>
                    </div>
                </div>
            </div>
            

            <div className="recomm_itemz_2">
                <div className="recomm_itemz_details">
                    <div className="recomm_item_name">{entry != undefined ? entry.title : title}</div>
                    <div className="recomm_item_vi">{votes || Math.floor((vote_average * 10))}%</div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default React.memo(Recom_View)