import React, { useEffect, useMemo } from 'react'
import MangaDetz from '../Manga/MangaDetz'
import { useGetAnimesQuery } from '../app/Jikan/jikanSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getFilState } from '../app/AppFunctions/headerFuncs'
import { urlQueries } from '../app/Oth/FilterSlice1'
import Pagination from '../Components/Pagination'
import { BtnQueryReady } from '../app/Oth/FilterSlice1'

const AnimeIndex = () => {
  let openFil = useSelector(getFilState);
  let urlQuery = useSelector(urlQueries)

  const Obj = {
    "erotica": 49,
    "action": 1,
    "drama": 8,
    "mystery": 7,
    "award-winning": 46,
    "adventures": 2,
    "fantasy": 10,
    "horror": 14,
    "supernatural": 37,
    "scifi": 24,
    "slice-of-life": 36,
    "suspense": 45,
    "ecchi": 9,
    "romance": 22,
    "comedy": 4,
    "girls-love": 26,
    "boys-love": 28,
    "sports": 30,
    "hentai": 12,
    "gourmet": 47
  }

  const query = urlQuery == "" ? (location.search) : urlQuery;
  const params = new URLSearchParams(query);

  const type = params.get("type");
  const page = params.get("page");
  const status = params.get("status");
  const sfw = params.get("sfw");
  const limit = params.get("limit");
  const end_date = params.get("end_date");
  const start_date = params.get("start_date");
  const min_score = params.get("min_score");
  const max_score = params.get("max_score");
  const genres = params.get("genres") ? params.get("genres").replaceAll(/erotica|drama|action|mystery|award-winning|adventures|fantasy|horror|supernatural|scifi|slice-of-life|sports|suspense|ecchi|romance|comedy|girls-love|boys-love|hentai|gourmet/gi, function(matched){
    return Obj[matched]
  }) : "";
  const letter = params.get("letter");
  const q = params.get("q");
  const sort = params.get("sort");

  const allParams = {
   ...(type && {type}),
   ...(page && {page}),
    ...(status && {status}),
    ...(sfw && {sfw}),
    ...(limit && {limit}),
    ...(end_date && {end_date}),
    ...(start_date && {start_date}),
    ...(min_score && {min_score}),
    ...(max_score && {max_score}),
    ...(genres && {genres}),
    ...(letter && {letter}),
    ...(q && {q}),
    ...(sort && {sort})
  }
  
  const {isError,
    isLoading,
    isSuccess,
    isFetching,
  data } = useGetAnimesQuery(allParams)

  let mappedData = []

 if(isSuccess){
    mappedData = data?.ids && data?.ids?.map((id) => (<MangaDetz key={id} mdf={data.entities[id]} />))
  }

  useEffect(() => {
    mappedData = []
  }, [isFetching])


  if(!isFetching && mappedData.length > 0){
    return (
      <section className={openFil ? "test" : "test"}>
        <div className="mangaFetched">  
          {mappedData}
        </div>
        {data.moreDets.items.count > 1 && <div className="paginate">
          {data ? <Pagination paginate={data.moreDets} /> : ""}
        </div>}
      </section>
    )
  }else if(isFetching){
    console.log("loading");
    return (<div>IS LOADING .........</div>)
  }
}

export default React.memo(AnimeIndex)