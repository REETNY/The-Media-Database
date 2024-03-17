import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getFilState } from '../app/AppFunctions/headerFuncs';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { getCalenDets, filState } from '../app/Oth/FilterSlice1';
import { changeDM, changeDP, changeNW, pickDate, setFil, setBtnQuery, BtnQueryReady, setIntersection, goToDate, setWatchProvide } from '../app/Oth/FilterSlice1';
import { changeOpenFil } from '../app/AppFunctions/headerFuncs';
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { useDetectClickOutside } from 'react-detect-click-outside';
import Types from '../Customs/Types';
import { useGetGenresQuery, useGetCertificationQuery, useGetWatchProviderQuery } from '../app/Tmdb/TmdbSlice';

import { useGetAllCountriesQuery } from '../app/Oth/IPSlice';

import NOImg from "../assets/No_Image.png"

import countriesList from "../assets/countries.json"

// import { DatePicker } from 'rsuite';
import DatePicker from 'rsuite/DatePicker';
import RangeSlider from 'rsuite/RangeSlider';
import SelectPicker from 'rsuite/SelectPicker';
import Checkbox from 'rsuite/Checkbox';
import TagPicker from 'rsuite/TagPicker';

const Header1 = ({TK}) => {
  const userIp = JSON.parse(localStorage.getItem("userIP")) != null ? JSON.parse(localStorage.getItem("userIP"))[0] : {};
  const typs = Types(location.pathname)
  let openFil = useSelector(getFilState)
  let fils = useSelector(filState)
  let isBtnReady = useSelector(BtnQueryReady);

  let dispatch = useDispatch()

  const [params, setParams] = useSearchParams();

  const [counDrop, setCountry] = useState({
    isFetch: false,
    data: `${userIp?.country_code == null ? "" : userIp?.country_code}`
  })

  const [avails, setAvails] = useState({
    all: params.get("with_watch_monetization_types") == null ? true : false,
    ads: params.get("with_watch_monetization_types")?.split(",")?.includes("ads") ? true : false,
    free: params.get("with_watch_monetization_types")?.split(",").includes("free") ? true : false,
    stream: params.get("with_watch_monetization_types")?.split(",")?.includes("stream") ? true : false,
    buy: params.get("with_watch_monetization_types")?.split(",")?.includes("buy") ? true : false,
    rent: params.get("with_watch_monetization_types")?.split(",")?.includes("rent") ? true : false,
  })

 function reles(){
  let locate = location.pathname;
  if(locate.includes("release_date")){
    return "rel"
  }else if(locate.includes("air_date") && !locate.includes("first_air")){
    return "air"
  }else if(locate.includes("first_air_date")){
    return "fair"
  }else{
    return typs == "movies" ? "rel" : "air"
  }
 }

 function reles2(){
  let path = location.pathname;
  if(path.includes("with_release_type") && path.includes("with_release_type") != undefined){
    let allValues = path.includes("with_release_type").split(",")
    allValues = allValues.map((item) => parseInt(item))
    return allValues;
  }else{
    return []
  }
 }

 const [releases, setReleases] = useState({
  data: typs == "movies" ? "release_date" : "air_date",
  all: reles() == "rel" ? true : false,
  first: reles() == "fair" ? true : false,
  air: reles() == "air" ? true : false,
  thea: reles2().includes(3) ? true : false,
  pre: reles2().includes(1) ? true : false,
  tv: reles2().includes(6) ? true : false,
  theaL: reles2().includes(2) ? true : false,
  phy: reles2().includes(5) ? true : false,
  dig: reles2().includes(4) ? true : false
 })

 let rangeObj = useRef({
  score: {
    min: 0,
    max: 10
  },
  vote:{
    min: 0,
    max: 300
  },
  runtime: {
    min: 0,
    max: 400
  }
 })

  // select each filters
  let sortBy = params.get("sort") != null
  ? params.get("sort")
  : params.get("sort_by") != null
  ? params.get("sort_by")
  : ""

  let query = params.get("q") != null
  ? params.get("q")
  : params.get("with_keyword") != null
  ? params.get("with_keyword")
  : ""

  let letter = params.get("letter") || "";

  let limit = params.get("limit") || 25;

  let type = params.get("type") || "";

  let status = params.get("status") || "";

  let Allgenres = params.get("genres") != null 
  ? params.get("genres").split(",")
  : params.get("with_genres") != null
  ? params.get("with_genres").split(",")
  : []

  let explicit = params.get("sfw") == null ? params.get("include_adult") : params.get("sfw")

  let minScore = params.get("min_score") != null
  ? parseFloat(params.get("min_score"))
  : params.get("vote_average.gte") != null
  ? parseFloat(params.get("vote_average.gte"))
  : 0

  let maxScore = params.get("max_score") != null
  ? parseFloat(params.get("max_score"))
  : params.get("vote_average.lte") != null
  ? parseFloat(params.get("vote_average.lte"))
  : 10

  let start = params.get("start_date") != null
  ? params.get("start_date")
  : params.get("release_date.lte") != null
  ? params.get("release_date.lte")
  : params.get("air_date.lte") != null
  ?  params.get("air_date.lte")
  : params.get("first_air_date.lte") != null
  ? params.get("first_air_date.lte")
  : new Date();

  let end = params.get("end_date") != null
  ? params.get("end_date")
  : params.get("release_date.gte") != null
  ? params.get("release_date.gte")
  : params.get("air_date.gte") != null
  ?  params.get("air_date.gte")
  : params.get("first_air_date.gte") != null
  ? params.get("first_air_date.gte")
  : new Date();

  let certificateParam = params.get("certification") != null ? params.get("certification") : "";

  let voteStart = params.get("vote_count.gte") != null ? parseFloat(params.get("vote_count.gte")) : 0;

  let voteEnd = params.get("vote_count.lte") != null ? parseFloat(params.get("vote_count.lte")) : 300;
  
  let runStart = params.get("with_runtime.gte") != null ? parseFloat(params.get("with_runtime.gte")) : 0;

  let runEnd = params.get("with_runtime.lte") != null ? parseFloat(params.get("with_runtime.lte")) : 400;

  let allProvider = params.get("with_watch_provider") != null ? params.get("with_watch_provider").split(",")  : [];

  let availabilities = params.get("with_watch_monetization_types") != null ? params.get("with_watch_monetization_types").split(",") : [];

  let releaseType = params.get("with_release_type") != null ? params.get("with_release_type").split(",") : [];


  // fetch genre from tmdb 
  const {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    data: genreTmdb
  } = (typs == "movies") 
  ? useGetGenresQuery({option: "movie"})
  : (typs == "series")
  ? useGetGenresQuery({option: `tv`})
  : ""
  // fetch certificate
  const {
    isLoading: isLoad,
    isFetching: isFetch,
    isSuccess: isSucceed,
    isError: isFailed,
    error: failData,
    data: certificationTmdb
  } = (typs == "movies") 
  ? useGetCertificationQuery({option: "movie"})
  : (typs == "series")
  ? useGetCertificationQuery({option: `tv`})
  : ""
  // fetch provider
  const {
    isLoading: isLoad2,
    isFetching: isFetch2,
    isSuccess: isSucceed2,
    isError: isFailed2,
    error: failData2,
    data: providerTmdb
  } = (typs == "movies") 
  ? useGetWatchProviderQuery({option: "movie", region:`${counDrop.data}`})
  : (typs == "series")
  ? useGetWatchProviderQuery({option: `tv`, region:`${counDrop.data}`})
  : ""
  // fetch countries
  const {
    isLoading: isLoad3,
    isFetching: isFetch3,
    isSuccess: isSucceed3,
    isError: isFailed3,
    error: failData3,
    data: countriesTmdb
  } = (typs == "movies") 
  ? useGetAllCountriesQuery()
  : (typs == "series")
  ? useGetAllCountriesQuery()
  : ""

  let genes = (genreTmdb?.genres.length > 0) ? genreTmdb?.genres : [];

  // func to add filters
  const addFilters = (key, val) => {

    if(params.has("page")){
      params.delete("page")
    }

    if(params.size == 1 && (val == "" || val == null) && isBtnReady){
      dispatch(setBtnQuery({val: false}))
    }else if(params.size >= 0 && isBtnReady == false){
      dispatch(setBtnQuery({val: true}))
    }else if(params.size == 0 && (val == "" || val == null) && isBtnReady){
      dispatch(setBtnQuery({val: false}))
    }

    setParams((prev) => {
      if(val == null || val == ""){
        prev.delete(key)
      }else if(Array.isArray(val)){
        let keyWord = ``;
        val.map((item, index) => {
          if(index == val.length - 1){
            keyWord += `${item}`
          }else{
            keyWord += `${item},`
          }
        })
        prev.set(key, keyWord)
      }else{
        prev.set(key, val)
      }
      return prev
    })

  }

  const deleteFilter = (key, val) => {
    setParams((prev) => {
      if(val == null || val == ""){
        prev.delete(key)
      }
      return prev
    })

    console.log(params);

    if(params.size == 1 && (val == "" || val == null) && isBtnReady){
      dispatch(setBtnQuery({val: false}))
    }else if(params.size >= 0 && (val == "" || val == null) && isBtnReady == false){
      dispatch(setBtnQuery({val: true}))
    }else if(params.size == 0 && (val == "" || val == null)  && isBtnReady){
      dispatch(setBtnQuery({val: false}))
    }
  }

  // function to ADD new genres to array
  let genreArr = useRef(Allgenres|| []);
  const genre = (data) => {
    
    if(genreArr.current.includes(data)){
      genreArr.current = genreArr.current.filter((item) => item == data ? false : item)
    }else{
      genreArr.current.push(data)
    }

    if(typs == "anime" || typs == "manga"){
      addFilters("genres", genreArr.current)
    }else{
      addFilters("with_genres", genreArr.current)
    }
  }

  // function to add watchProvider
  let providerArr = useRef(allProvider);
  const watchProvide = (data) => {
    if(providerArr.current.includes(data)){
      providerArr.current = providerArr.current.filter((item) => item == data ? false : item)
    }else{
      providerArr.current.push(data)
    }

    addFilters("with_watch_provider", providerArr.current)
    if(providerArr.current.length <= 0){
      deleteFilter("watch_region", null)
    }else if(providerArr.current.length > 0 && !params.get("watch_region")){
      addFilters("watch_region", counDrop.data)
    }
  }

  // function to add release type
  let relType = useRef(releaseType);
  const relEngage = (data) => {
    if(relType.current.includes(data)){
      relType.current = relType.current.filter((item) => item == data ? false : item)
    }else{
      relType.current.push(data)
    }

    addFilters("with_release_type", relType.current.length == 0 ? null : relType.current);
    if(relType.current.length <= 0){
      deleteFilter("with_release_type", null)
      addFilters("region", null)
    }else if(relType.current.length > 0 && !params.get("watch_region")){
      addFilters("region", counDrop.data)
    }
  }

  // func to check active genre
  const activeGenre = (val) => {
    return genreArr.current.includes(val)
  }


  let sty1 = {width: "27px", height: "27px", borderRadius: "50%", border: "2px solid green", display: "flex", placeContent: "center"};
  let sty2 = {display: "none"}

  // auto generate alphabets from a to z
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = [...alpha.map((x) => String.fromCharCode(x))];

  // certification
  let userCountry = JSON.parse(localStorage.getItem("userIP")) == null ? "" : counDrop.data;

  let CertificationCC = certificationTmdb?.certifications[userCountry] == null
  ? []
  : certificationTmdb?.certifications[userCountry];

  let certificate = (CertificationCC && CertificationCC != undefined) 
  ? CertificationCC?.map((item) => item.certification)
  : []

  // countries
  let selectCountries = countriesTmdb && countriesTmdb.map((item, index) => {
    let co = item;
    return {...co, code: item.iso2}
  })

  // provider
  const filterProviders = providerTmdb?.results?.length > 0 && providerTmdb?.results?.filter(
    (item) => 
    (item.display_priorities[counDrop.data] == null || item.display_priorities[counDrop.data] == 0) 
    ? false : item
  )

  const providersBtn = filterProviders?.length > 0 
  ? 
    filterProviders?.map((item, index) => {

      return(
        <div key={index} onClick={() => watchProvide(item.provider_id)} className={allProvider.includes((item.provider_id).toString()) ? "providersBtn active" : "providersBtn"}>
          <div className="provideImg">
            <img src={`https://image.tmdb.org/t/p/w300${item.logo_path}`} alt={`${item.provider_name}`} />
          </div>
        </div> 
      )
    })
  : []

  // intersection observer
  useEffect(() => {
    const BtnQuery = document.querySelector(".submitQueryBtn");

    const observerOptions = {
      root: null,
      threshold: 0.5
    }
  
    const keepWatch = (el) => {
      if(el[0].isIntersecting){
        dispatch(setIntersection(true))
      }else{
        dispatch(setIntersection(false))
      }
    }
  
    let observer = new IntersectionObserver(keepWatch, observerOptions)
    observer.observe(BtnQuery);
  }, [])

  // logger
  // console.log(availabilities);

  return (
      <div className={openFil ? `mangaFilters open` : "mangaFilters"}>
        <div onClick={() => dispatch(changeOpenFil())} className="closeFilBtn">xlose</div>

        <div className="filtration">

          { (typs == "anime" || typs == "manga") &&
            <div className="letterSort">
            <div className="dropHead" onClick={() => dispatch(setFil("letterFil"))}><span className="head">Aplha</span> <span style={letter != "" ? sty1 : sty2 } className="activeLetter">{letter}</span> <span className={fils.letterFil ? "arrBtn move" : "arrBtn"}><FaCaretDown /></span></div>
            <div className={fils.letterFil ? "dropFilter open" : "dropFilter"}>
              {alphabet.map((item, index) => <li style={letter == item ? {border: "2px solid green"} : {}} onClick={() => {
                if(letter == item){
                  addFilters("letter", "")
                }else{
                  addFilters("letter", `${item}`)
                }
              }} key={index}>{item}</li>)}
            </div>
            </div>
          }

          <div className="sortingMethod">
              <div className="dropHead"  onClick={() => dispatch(setFil("sortBy"))}><span className="head">Sort</span> <span className={fils.sortBy ? "arrBtn move" : "arrBtn"}><FaCaretDown /></span></div>
              <div className={fils.sortBy ? "sortingCont open" : "sortingCont"}>
                <div className="sort_head">Sort by Order</div>
                { (typs == "anime" || typs == "manga") 
                ?
                  <select onChange={(e) => {
                    addFilters("sort", e.target.value)
                    }} name="" id="chooseSort" value={sortBy}>
                    <option value="">None</option>
                    <option value="Asc">Ascending Order</option>
                    <option value="desc">Descending Order</option>
                  </select>
                :
                  <select onChange={(e) => {
                    addFilters("sort_by", e.target.value)
                    }} name="" id="chooseSort" value={sortBy}>
                    <option value="">None</option>
                    <option value="popularity.desc">Popularity Desc</option>
                    <option value="popularity.asc">Popularity Asc</option>
                    <option value="vote_average.desc">Vote Average Desc</option>
                    <option value="vote_average.asc">Vote Average Asc</option>
                    <option value="vote_count.desc">Vote Count Desc</option>
                    <option value="vote_count.asc">Vote Count Asc</option>
                    <option value="name.desc">Name Desc</option>
                    <option value="name.asc">Name Asc</option>
                   {typs == "tv" && <>
                      <option value="first_air_date.desc">First Air Date Desc</option>
                      <option value="first_air_date.asc">First Air Date Asc</option>
                    </>
                    }
                  </select>
                }
              </div>
          </div>

          { (typs == "movies" || typs == "series") &&
          <div className="forWatch">
            <div className="dropHead" onClick={() => dispatch(setWatchProvide("watchProvide"))}>
              <span className="head">Watch Provider</span> <span className={fils.query ? "arrBtn move" : "arrBtn"}><FaCaretDown /></span>
            </div>
            <div className={fils.watchProvide ? "watchSol" : "watchSol close"}>

              <div className="drop_head_cont">
                <div className="sort_head">Country</div>
              </div>

              { (typs == "movies" || typs == "series") &&
                <div className="countryDropDown">
                  {(isSucceed3 && countriesTmdb.length > 0) && <SelectPicker 
                    style={{width: "100%"}}
                    searchable 
                    value={counDrop.data}
                    onChange={(value) => setCountry((obj) => ({...obj, data: value}))}
                    renderMenuItem={(label, item) => {
                      return (
                        <div className='countryOpt'>
                          <div className="countryImg">
                            <img 
                              onError={(e) => {
                                (e.target.src) = NOImg;
                              }}
                              //https://flagsapi.com/${item.value}/flat/64.png
                              src={`https://flagcdn.com/w40/${item?.value.toLowerCase()}.png`} 
                              alt={label} 
                            />
                          </div>
                          <div className="countryText">{label}</div>
                        </div>
                      )
                    }}
                    renderValue={(item, value) => {
                      return (
                        <div className="country_select">
                          <div className="seletedOpt_img">
                            <img src={`https://flagcdn.com/w40/${item.toLowerCase()}.png`} alt="" />
                          </div>
                          <div className="selectedOpt_text">{value.label != undefined ? value.label : ""}</div>
                        </div>
                      )
                    }}
                    data={selectCountries != undefined ? selectCountries?.map((item) => ({label: item.name, value: item.code})) : []} 
                  />}
                </div>
              }

              <div className="mappedData_monitization">
                {providersBtn}
              </div>
              
            </div>
          </div>
          }

          <div className="queryFor">
            <div className="dropHead" onClick={() => dispatch(setFil("query"))}>
              <span className="head">Query</span> <span className={fils.query ? "arrBtn move" : "arrBtn"}><FaCaretDown /></span>
            </div>
            <div className={fils.query ? "dropSolution open" : "dropSolution"}>
              <div className="sort_head">Query Search</div>
              <div className="searchCont">
                <input type="text" onChange={(e) => {
                  if(typs == "anime" || typs == "manga"){
                    addFilters("q", e.target.value)
                  }else{
                    addFilters("with_keyword", e.target.value)
                  }
                }} value={query} />
                <span className="query_icon"><IoMdSearch /></span>
              </div>
            </div>
          </div>

          <div className="otherFilters">
              <div className="dropHead" onClick={() => {
                dispatch(setFil("others"))
              }}>
                <span className="head">Others Filters</span> <span className={fils.others ? "arrBtn move" : "arrBtn"}><FaCaretDown /></span>
              </div>
              
              <div className={fils.others ? "eachFiltersCont open" : "eachFiltersCont"}>

                { (typs == "anime" || typs == "manga") &&
                  <div className="forType">

                  <div className="sort_head">Type</div>


                  <div className="selectType" onClick={() => dispatch(setFil("type"))}>

                    <div className="selectScreen">
                      <div className="typePicked">{type == "" ? "All" : type}</div>
                      <span className={fils.type ? "arrBtn move" : "arrBtn"}><FaCaretDown /></span>
                    </div>

                    <div id='doc1' className={fils.type ? "eachPicks open" : "eachPicks"}>
                      <div onClick={() => addFilters("type", "")} className={type == "" ? "ePicks active" : "ePicks"}>All</div>
                      <div onClick={() =>  addFilters("type", "Manga")} className={type == "Manga" ? "ePicks active" : "ePicks"}>Manga</div>
                      <div onClick={() =>  addFilters("type", "Manhwa")} className={type == "Manhwa" ? "ePicks active" : "ePicks"}>Manhwa</div>
                      <div onClick={() =>  addFilters("type", "Novel")} className={type == "Novel" ? "ePicks active" : "ePicks"}>Novel</div>
                      <div onClick={() =>  addFilters("type", "Manhua")} className={type == "Manhua" ? "ePicks active" : "ePicks"}>Manhua</div>
                      <div onClick={() =>  addFilters("type", "Doujin")} className={type == "Doujin" ? "ePicks active" : "ePicks"}>Doujin</div>
                      <div onClick={() =>  addFilters("type", "Oneshot")} className={type == "Oneshot" ? "ePicks active" : "ePicks"}>Oneshot</div>
                      <div onClick={() =>  addFilters("type", "Lightnovel")} className={type == "LightNovel" ? "ePicks active" : "ePicks"}>LightNovel</div>
                    </div>

                  </div>


                  </div>
                }

                { (typs == "anime" || typs == "manga") &&
                  <div className="forLimit">
                  <div className="sort_head">Limit</div>
                  <div className="rangeCont">
                    <div className="rangeHelper">
                      <li>5</li>
                      <li>10</li>
                      <li>15</li>
                      <li>20</li>
                      <li>25</li>
                    </div>
                    <input onChange={(e) => addFilters("limit", parseInt(e.target.value) == 25 ? "" : e.target.value)} type="range" id="rangeLimiter" min="5" max="25" name="" step="5"  value={limit}/>
                  </div>
                  </div>
                }

                <div className="forExplicit">
                  <div className="exContentInp">
                    <span className="switchContent">No Explicit Content?</span>
                    <label htmlFor="explicitContent" className='explicitContent'>
                        <input value={Boolean(explicit)} onChange={(e) => {
                          typs == "anime" || typs == "manga"
                          ? addFilters("sfw", e.target.checked)
                          : addFilters("include_adult", e.target.checked)
                        }} type="checkbox" name="explicitContent" id="explicitContent" />
                        <div className={explicit ? "roundedBtn active": "roundedBtn"}></div>
                    </label>
                  </div>
                </div>

                { (typs == "anime" || typs == "manga") &&
                  <div className="forType status">

                  <div className="sort_head">Status</div>


                  <div className="selectType" onClick={() => dispatch(setFil("status"))}>

                    <div className="selectScreen">
                      <div className="typePicked">{status == "" ? "None Selected" : status}</div>
                      <span className={fils.status ? "arrBtn move" : "arrBtn"}><FaCaretDown /></span>
                    </div>

                    <div id='doc1' className={fils.status ? "eachPicks open" : "eachPicks"}>
                      <div onClick={() => addFilters("status", "")} className={status == "" ? "ePicks active" : "ePicks"}>None Selected</div>
                      <div onClick={() => addFilters("status", "Publishing")} className={status == "Publishing" ? "ePicks active" : "ePicks"}>Publishing</div>
                      <div onClick={() => addFilters("status", "Completed")} className={status == "Completed" ? "ePicks active" : "ePicks"}>Completed</div>
                      <div onClick={() =>  addFilters("status", "Haitus")} className={status == "Haitus" ? "ePicks active" : "ePicks"}>Haitus</div>
                      <div onClick={() =>  addFilters("status", "Discontinued")} className={status == "Discontinued" ? "ePicks active" : "ePicks"}>Discontinued</div>
                      <div onClick={() => addFilters("status", "Upcoming")} className={status == "Upcoming" ? "ePicks active" : "ePicks"}>Upcoming</div>
                    </div>

                  </div>


                  </div>
                }

                <div className="forDate">

                  <div className="sort_head">{(typs =="anime" || typs == "manga" || typs == "movies") ? `Release Date` : `Air Date`}</div>

                  {
                    (typs == "movies" || typs == "series")
                    &&
                    <div className='include_date_exg'>
                      <div className="checkOptions">
                        {
                          typs == "movies"
                          ? 
                          <div className="checkOption">

                            <div className="firstCheck">
                              <Checkbox 
                                checked={releases.all}
                                onChange={(checked) => {
                                  if(releases.all){
                                    setReleases((obj) => ({...obj, all: !releases.all, data: ''}))
                                    addFilters("with_release_type", relType.current)
                                  }else{
                                    setReleases((obj) => ({...obj, all: !releases.all, data: "release_date"}))
                                    deleteFilter("with_release_type", null)
                                    deleteFilter("region", null)
                                  }
                                }}
                                
                              >
                                Search All releases
                              </Checkbox>
                            </div>

                           {!releases.all && <div className="secondCheck">

                              <div className="each_second_check">
                                <Checkbox 
                                  checked={releases.theaL}
                                  onChange={() => {
                                    if(releases.theaL){
                                      setReleases((obj) => ({...obj, theaL: !releases.theaL}))
                                      relEngage(2)
                                    }else{
                                      setReleases((obj) => ({...obj, theaL: !releases.theaL}))
                                      relEngage(2)
                                    }
                                    
                                  }}
                                >
                                  Theatrical Limited
                                </Checkbox>
                              </div>

                              <div className="each_second_check">
                                <Checkbox 
                                  checked={releases.pre}
                                  onChange={() => {
                                    if(releases.pre){
                                      setReleases((obj) => ({...obj, pre: !releases.pre}))
                                      relEngage(1)
                                    }else{
                                      setReleases((obj) => ({...obj, pre: !releases.pre}))
                                      relEngage(1)
                                    }
                                    
                                  }}
                                >
                                  Premeire
                                </Checkbox>
                              </div>

                              <div className="each_second_check">
                                <Checkbox 
                                    checked={releases.thea}
                                    onChange={() => {
                                      if(releases.thea){
                                        setReleases((obj) => ({...obj, thea: !releases.thea}))
                                        relEngage(3)
                                      }else{
                                        setReleases((obj) => ({...obj, thea: !releases.thea}))
                                        relEngage(3)
                                      }
                                      
                                    }}
                                  >
                                    Theatrical
                                </Checkbox>
                              </div>

                              <div className="each_second_check">
                                <Checkbox 
                                    checked={releases.dig}
                                    onChange={() => {
                                      if(releases.dig){
                                        setReleases((obj) => ({...obj, dig: !releases.dig}))
                                        relEngage(4)
                                      }else{
                                        setReleases((obj) => ({...obj, dig: !releases.dig}))
                                        relEngage(4)
                                      }
                                      
                                    }}
                                  >
                                    Digital
                                </Checkbox>
                              </div>

                              <div className="each_second_check">
                                <Checkbox 
                                    checked={releases.phy}
                                    onChange={() => {
                                      if(releases.phy){
                                        setReleases((obj) => ({...obj, phy: !releases.phy}))
                                        relEngage(5)
                                      }else{
                                        setReleases((obj) => ({...obj, phy: !releases.phy}))
                                        relEngage(5)
                                      }
                                      
                                    }}
                                  >
                                    Physical
                                </Checkbox>
                              </div>

                              <div className="each_second_check">
                                <Checkbox 
                                    checked={releases.tv}
                                    onChange={() => {
                                      if(releases.tv){
                                        setReleases((obj) => ({...obj, tv: !releases.tv}))
                                        relEngage(6)
                                      }else{
                                        setReleases((obj) => ({...obj, tv: !releases.tv}))
                                        relEngage(6)
                                      }
                                      
                                    }}
                                  >
                                    TV
                                </Checkbox>
                              </div>

                            </div>
                          }
                            
                          </div>
                          : 
                          <div className="checkOption">

                            <div className="firstCheck">

                              <Checkbox 
                                checked={releases.air}
                                onChange={(checked) => {
                                  if(releases.air){
                                    setReleases((obj) => ({...obj, air: !releases.air, data: ''}))
                                  }else{
                                    setReleases((obj) => ({...obj, all: !releases.air, data: "air_date"}))
                                  }
                                }}
                              >
                                All Air Date
                              </Checkbox>

                              { !releases.air &&
                              <Checkbox 
                                checked={releases.first}
                                onChange={(checked) => {
                                  if(releases.first){
                                    setReleases((obj) => ({...obj, first: !releases.first, data: ''}))
                                  }else{
                                    setReleases((obj) => ({...obj, first: !releases.first, data: "first_air_date"}))
                                  }
                                }}
                              >
                                First Air Date
                              </Checkbox>
                              }

                            </div>
                            
                          </div>
                        }
                      </div>
                    </div>
                  }

                  <div className="myCustomDate">
                    <div className="custom_date_head">From</div>
                    <div className="custom_date_element">
                      <DatePicker 
                        format='yyyy-MM-dd' 
                        value={start != null && new Date(start)}
                        onChange={(date) => {
                          let DateData = new Date(date);
                          let year = DateData.getFullYear()
                          let month = DateData.getMonth() + 1;
                          let day = DateData.getDate();
                          if(typs == "anime" || typs == "manga"){
                            let year = DateData.getFullYear();
                            addFilters("start_date", `${year}-${month}-${day}`)
                          }else if(typs == "movies" || typs == "series"){
                            addFilters(`${releases.data}.gte`, `${year}-${month}-${day}`)
                          }
                        }}
                        onClean={() => {
                          if(typs == "anime" || typs == "manga"){
                            addFilters("start_date", null)
                          }else if(typs == "movies" || typs == "series"){
                            addFilters(`${releases.data}.gte`, null)
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="myCustomDate">
                    <div className="custom_date_head">To</div>
                    <div className="custom_date_element">
                      <DatePicker 
                        value={end != null && new Date(end)}
                        format='yyyy-MM-dd' 
                        onChange={(date) =>{
                          let DateData = new Date(date);
                          let year = DateData.getFullYear()
                          let month = DateData.getMonth() + 1;
                          let day = DateData.getDate();
                          if(typs == "anime" || typs == "manga"){
                            let year = DateData.getFullYear();
                            addFilters("end_date", `${year}-${month}-${day}`)
                          }else if(typs == "movies" || typs == "series"){
                            addFilters(`${releases.data}.lte`, `${year}-${month}-${day}`)
                          }else{

                          }
                        }}
                        onClean={() => {
                          if(typs == "anime" || typs == "manga"){
                            addFilters("end_date", null)
                          }else if(typs == "movies" || typs == "series"){
                            addFilters(`${releases.data}.lte`, null)
                          }
                        }}
                      />
                    </div>
                  </div>

                </div>
                
                <div className="forGenres">
                  <div className="sort_head">Genres</div>
                  { (typs == "anime" || typs == "manga")
                  ?
                    <div className="allGenres">
                      <div onClick={() => genre("action")} className={activeGenre("action") ? "genreFil active" : "genreFil"} >Action</div>
                      <div onClick={() => genre("drama")} className={activeGenre("drama") ? "genreFil active" : "genreFil"}>Drama</div>
                      <div onClick={() => genre("mystery")} className={activeGenre("mystery") ? "genreFil active" : "genreFil"}>Mystery</div>
                      <div onClick={() => genre("adventures")} className={activeGenre("adventures") ? "genreFil active" : "genreFil"}>Adventure</div>
                      <div onClick={() => genre("fantasy")} className={activeGenre("fantasy") ? "genreFil active" : "genreFil"}>Fantasy</div>
                      <div onClick={() => genre("horror")} className={activeGenre("horror") ? "genreFil active" : "genreFil"}>Horror</div>
                      <div onClick={() => genre("sci-fi")} className={activeGenre("sci-fi") ? "genreFil active" : "genreFil"}>Sci-fi</div>
                      <div onClick={() => genre("slice-of-life")} className={activeGenre("slice-of-life") ? "genreFil active" : "genreFil"}>Slice of Life</div>
                      <div onClick={() => genre("sports")} className={activeGenre("sports") ? "genreFil active" : "genreFil"}>Sports</div>
                      <div onClick={() => genre("suspense")} className={activeGenre("suspense") ? "genreFil active" : "genreFil"}>Suspense</div>
                      <div onClick={() => genre("ecchi")} className={activeGenre("ecchi") ? "genreFil active" : "genreFil"}>Ecchi</div>
                      <div onClick={() => genre("romance")} className={activeGenre("romance") ? "genreFil active" : "genreFil"}>Romance</div>
                      <div onClick={() => genre("comedy")} className={activeGenre("comedy") ? "genreFil active" : "genreFil"}>Comedy</div>
                      <div onClick={() => genre("girls-love")} className={activeGenre("girls-love") ? "genreFil active" : "genreFil"}>Girls Love</div>
                      <div onClick={() => genre("supernatural")} className={activeGenre("supernatural") ? "genreFil active" : "genreFil"}>Super Natural</div>
                      <div onClick={() => genre("boys-love")} className={activeGenre("boys-love") ? "genreFil active" : "genreFil"}>Boys Love</div>
                      <div onClick={() => genre("erotica")} className={activeGenre("erotica") ? "genreFil active" : "genreFil"}>Erotica</div>
                      <div onClick={() => genre("award-winning")} className={activeGenre("award-winning") ? "genreFil active" : "genreFil"}>Award Winning</div>
                      <div onClick={() => genre("hentai")} className={activeGenre("hentai") ? "genreFil active" : "genreFil"}>Hentai</div>
                      <div onClick={() => genre("gourmet")} className={activeGenre("gourmet") ? "genreFil active" : "genreFil"}>Gourmet</div>
                    </div>
                  : 
                  <div className="allGenres">
                    {
                      genes.map((item, index) => {
                        return (
                          <div key={index} onClick={() => genre(`${item.name}`)} className={activeGenre(`${item.name}`) ? "genreFil active" : "genreFil"} >{item.name}</div>
                        )
                      })
                    }
                  </div>
                  }

                </div>

                {
                  (typs == "movies" || typs == "series")
                  &&
                  <div className='forCertification'>
                    <div className="certification_head">Certification</div>
                    <div className="certification_body">
                      {
                        <SelectPicker 
                          placeholder="Select Certificate" 
                          style={{width: "100%"}}
                          searchable={false}
                          value={certificateParam}
                          data={certificate && certificate?.map((item) => ({label: item, value: item}))}
                          onChange={(val) => {
                            if(val == null)return
                            addFilters("certification", val)
                            addFilters("certification_country", "US")
                          }}
                          onClean={() => {
                            addFilters("certification", null)
                            addFilters("certification_country", null)
                          }}
                        />
                      }
                    </div>
                  </div>
                }

                {
                  (typs == "movies" || typs == "series") &&
                  <div className="forAvailabilities">
                    <div className="availabilitiesHead">Availabilities</div>
                    <div className="availabilities_content">

                      <div className="fsAvail">
                        <Checkbox 
                          checked={avails.all}
                          onChange={(check) => {
                            if(avails.all){
                              setAvails((obj) => ({...obj, all: !avails.all, ads: !avails.ads, free: !avails.free, buy: !avails.buy, rent: !avails.rent, stream: !avails.stream}))
                              let arr = [!avails.ads && "ads", !avails.free && "free", !avails.buy && "buy", !avails.stream && "stream", !avails.rent && "rent"].filter((item) => item == false ? false : item);
                              addFilters("with_watch_monetization_types", arr)
                              addFilters("watch_region", counDrop.data)
                            }else{
                              setAvails((obj) => ({...obj, all: !avails.all, ads: !avails.ads, free: !avails.free, buy: !avails.buy, rent: !avails.rent, stream: !avails.stream}))
                              addFilters("with_watch_monetization_types", null)
                              addFilters("watch_region", null)
                            }
                          }}
                        >
                          Search all availabilities?
                        </Checkbox>
                      </div>

                      { !avails.all && <div className="scAvail">

                        <div className="availOptions">
                          <Checkbox 
                            onChange={() => {
                              if(availabilities.includes("ads")){
                                let avail = availabilities.filter((item) => item == "ads" ? false : item);
                                addFilters("with_watch_monetization_types", avail)
                              }else{
                                let avail = [...availabilities, "ads"]
                                addFilters("with_watch_monetization_types", avail)
                              }
                              setAvails((obj) => ({...obj, ads:!avails.ads}));
                            }} 
                            checked={avails.ads}
                          >
                            Ads
                          </Checkbox>
                        </div>

                        <div className="availOptions">
                          <Checkbox 
                            checked={avails.free}
                            onChange={() => {
                              if(availabilities.includes("free")){
                                let avail = availabilities.filter((item) => item == "free" ? false : item);
                                addFilters("with_watch_monetization_types", avail)
                              }else{
                                let avail = [...availabilities, "free"]
                                addFilters("with_watch_monetization_types", avail)
                              }
                              setAvails((obj) => ({...obj, free:!avails.free}));
                            }}  
                          >
                            Free
                          </Checkbox>
                        </div>

                        <div className="availOptions">
                          <Checkbox 
                            checked={avails.buy}
                            onChange={() => {
                              if(availabilities.includes("buy")){
                                let avail = availabilities.filter((item) => item == "buy" ? false : item);
                                addFilters("with_watch_monetization_types", avail)
                              }else{
                                let avail = [...availabilities, "buy"]
                                addFilters("with_watch_monetization_types", avail)
                              }
                              setAvails((obj) => ({...obj, buy:!avails.buy}));
                            }} 
                          >
                            Buy
                          </Checkbox>
                        </div>

                        <div className="availOptions">
                          <Checkbox 
                            checked={avails.rent}
                            onChange={() => {
                              if(availabilities.includes("rent")){
                                let avail = availabilities.filter((item) => item == "rent" ? false : item);
                                addFilters("with_watch_monetization_types", avail)
                              }else{
                                let avail = [...availabilities, "rent"]
                                addFilters("with_watch_monetization_types", avail)
                              }
                              setAvails((obj) => ({...obj, rent:!avails.rent}));
                            }} 
                          >
                            Rent
                          </Checkbox>
                        </div>

                        <div className="availOptions">
                          <Checkbox 
                            checked={avails.stream}
                            onChange={() => {
                              if(availabilities.includes("stream")){
                                let avail = availabilities.filter((item) => item == "stream" ? false : item);
                                addFilters("with_watch_monetization_types", avail)
                              }else{
                                let avail = [...availabilities, "stream"]
                                addFilters("with_watch_monetization_types", avail)
                              }
                              setAvails((obj) => ({...obj, stream:!avails.stream}));
                            }}  
                          >
                            Stream
                          </Checkbox>
                        </div>

                      </div>}

                    </div>
                  </div>
                }

                <div className="forMax_MinScore">

                  <div className="sort_head">Score</div>

                  <div className="rangeContainer">
                    <RangeSlider 
                      width="100%"
                      min={0}
                      max={10}
                      step={1}
                      defaultValue={[0, 10]}
                      value={[minScore, maxScore]}

                      onChangeCommitted={([minVal, maxVal], event) => {

                        console.log(maxVal, minVal, rangeObj.current.score);

                        if(minVal != rangeObj.current.score.min){
                          rangeObj.current.score.min = minVal;
                          if(typs == "anime" || typs == "manga"){
                            addFilters("min_score", minVal == 0 ? "" : minVal)
                          }else if(typs == "movies" || typs == "series"){
                            addFilters("vote_average.gte", minVal)
                          }
                        }

                        if(maxVal != rangeObj.current.score.max){
                          rangeObj.current.score.max = maxVal;
                          if(typs == "anime" || typs == "manga"){
                            addFilters("max_score", maxVal == 10 ? "" : maxVal)
                          }else if(typs == "movies" || typs == "series"){
                            addFilters("vote_average.lte", maxVal)
                          }
                        }
                      }}
                      graduated
                      progress
                      renderMark={mark => {
                        return <span>{mark}</span>
                      }}
                    />
                  </div>
                                
                  
                </div>

                {
                  (typs == "movies" || typs == "series") &&
                  <div className='forVoteCount'>
                    <div className="sort_head">User Votes</div>
                    <div className="rangeContainer">
                      <RangeSlider 
                      width="100%"
                        min={0}
                        max={300}
                        step={50}
                        value={[voteStart, voteEnd]}
                        onChangeCommitted={([minVal, maxVal]) => {
                          if(rangeObj.current.vote.min != minVal){
                            rangeObj.current.vote.min = minVal;
                            addFilters("vote_count.gte", minVal)
                          }
                          if(rangeObj.current.vote.max != maxVal){
                            rangeObj.current.vote.max = maxVal;
                            addFilters("vote_count.lte", maxVal)
                          }
                        }}
                        graduated
                        progress
                        renderMark={mark => {
                          return mark % 100 == 0 && <span>{mark}</span> 
                        }}
                      />
                    </div>
                  </div>
                }

                {
                  (typs == "movies" || typs == "series") &&
                  <div className='forRuntime'>
                    <div className="sort_head">Runtime</div>
                    <div className="rangeContainer">
                      <RangeSlider 
                      width="100%"
                        min={0}
                        max={400}
                        step={50}
                        value={[runStart, runEnd]}
                        onChangeCommitted={([minVal, maxVal]) => {
                          if(rangeObj.current.runtime.min != minVal){
                            rangeObj.current.runtime.min = minVal;
                            addFilters("with_runtime.gte", minVal)
                          }
                          if(rangeObj.current.runtime.max != maxVal){
                            rangeObj.current.runtime.max = maxVal;
                            addFilters("with_runtime.lte", maxVal)
                          }
                        }}
                        graduated
                        progress
                        renderMark={mark => {
                          return mark % 100 == 0 && <span>{mark}</span> 
                        }}
                      />
                    </div>
                  </div>
                }

              </div>
          </div>

        </div>
          
          {/* TK is the takeQuery function in mangalayout passed as props to the header */}
        <button onClick={() => TK()} className={isBtnReady ? "submitQueryBtn active" : "submitQueryBtn"}>SEARCH</button>
    </div>

  )
}

export default React.memo(Header1)