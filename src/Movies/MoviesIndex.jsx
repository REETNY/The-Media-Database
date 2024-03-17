import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Mv_Tv, urlQueries } from '../app/Oth/FilterSlice1'
import Pagination from '../Components/Pagination'
import { getFilState } from '../app/AppFunctions/headerFuncs'
import MoviesDetz from './MoviesDetz'
import { useGetMoviesQuery } from '../app/Tmdb/TmdbSlice'

const MoviesIndex = () => {
  let openFil = useSelector(getFilState);
  let urlQuery = useSelector(urlQueries);

  const query = urlQuery == "" ? (location.search) : urlQuery;
  const params = new URLSearchParams(query);

  const pathPolifier = useSelector(Mv_Tv)

  const GenObj = {
    "Action" : 28,
    "Adventure": 12,
    "Animation": 16,
    "Comedy": 35,
    "Crime": 80,
    "Documentary": 99,
    "Drama": 18,
    "Family": 10751,
    "Fantasy": 14,
    "History": 36,
    "Horror": 27,
    "Music": 10402,
    "Mystery": 9648,
    "Romance": 10749,
    "Science Fiction": 878,
    "Tv Movie": 10770,
    "Thriller": 53,
    "War": 10752,
    "Western": 37
  }

  const RelObj = {
    "Premeire": 1,
    "Theatrical Limited": 2,
    "Theatrical": 3,
    "Digital": 4,
    "Physical": 5,
    "Tv": 6
  }

  const sort_by = params.get("sort_by");
  const with_watch_provider = params.get("with_watch_provider");
  const watch_region = params.get("watch_region");
  const include_adult = params.get("include_adult");
  const with_genres = params.get("with_genres") ? params.get("with_genres").replaceAll(/romance|/gi, function(matched){
    return GenObj[matched]
  }) : "";
  const certification = params.get("certification");
  const certification_body = params.get("certification_body");
  const with_watch_monetization_types = params.get("with_watch_monetization_types");
  const vote_average_max = params.get("vote_average.lte");
  const vote_average_min = params.get("vote_average.gte");
  const vote_count_max = params.get("vote_count.lte");
  const vote_count_min = params.get("vote_count.gte");
  const with_runtime_max = params.get("with_runtime.lte");
  const with_runtime_min = params.get("with_runtime.gte");
  const with_release_type = params.get("with_release_type");
  const region = params.get("region");
  const release_date_max = params.get("release_date.lte");
  const release_date_min = params.get("release_date.gte");
  const language = params.get("with_original_language")
  const page = params.get("page");

  const options = {
    ...(sort_by && {sort_by}),
    ...(with_watch_provider && {with_watch_provider}),
    ...(watch_region && {watch_region}),
    ...(include_adult && {include_adult}),
    ...(with_genres && {with_genres}),
    ...(certification && {certification}),
    ...(certification_body && {certification_body}),
    ...(with_watch_monetization_types && {with_watch_monetization_types}),
    ...(vote_average_max  && {"vote_average.lte": vote_average_max}),
    ...(vote_average_min && {"vote_average.gte": vote_average_min}),
    ...(vote_count_max && {"vote_count.lte": vote_count_max}),
    ...(vote_count_min && {"vote_average.gte": vote_count_min}),
    ...(with_runtime_max && {"with_runtime.lte": with_runtime_max}),
    ...(with_runtime_min && {"with_runtime.gte": with_runtime_min}),
    ...(with_release_type && {with_release_type}),
    ...(region && {region}),
    ...(release_date_max && {"release_date.lte": release_date_max}),
    ...(release_date_min && {"release_date.gte": release_date_min}),
    ...(language && {language}),
    ...(page && {page})
  }

  const {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    data: moviesData
  } = useGetMoviesQuery({options: options, type: pathPolifier})


  console.log(moviesData, with_genres);

  let mappedData = [];

  if(isSuccess){
    mappedData = moviesData.ids.map((id) => (<MoviesDetz key={id} mdf={moviesData.entities[id]} />))
  }

  if(!isFetching && mappedData.length > 0){
    return (
      <section className={openFil ? "test" : "test"}>
        <div className="mangaFetched">  
          {mappedData}
        </div>
        {moviesData.moreDets.items.count > 1 && <div className="paginate">
          {moviesData ? <Pagination paginate={moviesData.moreDets} /> : ""}
        </div>}
      </section>
    )
  }

  if(isLoading || isFetching){

  }

}

export default MoviesIndex