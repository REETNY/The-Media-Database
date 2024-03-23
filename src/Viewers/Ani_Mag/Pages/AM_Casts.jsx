import React, { useRef, useState } from 'react'
import AM_Header from '../../../Components2/AM_Header'
import { useAnimeCastQuery, useMangaCastQuery } from '../../../app/Jikan/jikanSlice'
import Types from '../../../Customs/Types'
import { useParams } from 'react-router-dom'
import { rgbColor } from '../../../app/AppFunctions/colorPicker'
import { useSelector } from 'react-redux'
import { useGetCreditsQuery } from '../../../app/Tmdb/TmdbSlice'
import BrokenImage from "../../../assets/Broken.svg"

const AM_Casts = () => {

  const types = Types(location.pathname);
  const [Lang, setLang] = useState("")
  const {id} = useParams()

  const {
    data: result, 
    isSuccess,
    isLoading,
    isError,
    error
  } = types == "anime"
  ? useAnimeCastQuery({id})
  : types == "manga"
  ? useMangaCastQuery({id})
  : types == "movies"
  ? useGetCreditsQuery({id, type: "movie"})
  : useGetCreditsQuery({id, type: "tv"})

  const statusClr = useSelector(rgbColor);
  const statusStyl = {
    background: `rgb(${statusClr})`
  }
  const statusAct = {
    background: `rgb(${statusClr})`,
    color: "grey"
  }

  let count = useRef([])

  if(types == "anime" && result != undefined && Lang == ""){
    result?.data?.map((item) => {
      let person = item;
      person.voice_actors.map((item) => {
        let temp = item.language;
        if(!count.current.includes(temp)) {
          count.current.push(temp)
        }
      })
    })
    
    if(Lang == ""){
      setLang(count.current[0])
    }
  }

  const dynAM = 
  (types == "anime" && result != undefined)
  ? result?.data?.map((item, index) => {
    let {name, images} = item.character;
    let { role } = item;
    let LT = item.voice_actors || [];
    const CLT = LT.find((item) => item["language"] == Lang);

    if(CLT != undefined && CLT.person){
      return(<div key={index} className="character_voice_actor_cont">
        <div className="characterCont">
          <div className="characterImgCont">
            <img onError={(e) => e.target.src = BrokenImage } className="charact_img" src={images.webp.image_url} alt={name} />
          </div>
          <div className="character_info">
            <div className="character_name">{name}</div>
            <div className="character_role">{role}</div>
          </div>
        </div>
        <div className="voice_actorCont">
          <div className="voice_actorImgCont">
            <img className="voice_img" src={CLT.person.images.jpg.image_url} alt="" />
          </div>
          <div className="voice_actor_info">
            <div className="voice_actor_name">{CLT.person.name}</div>
            <div className="voice_actor_role">{CLT.language} Voice Actor</div>
          </div>
        </div>
      </div>
      )
    }
    
  })
  : (types == "manga" && result != undefined)
  ? result?.data?.map((item, index) => {
    let { name, images} = item.character;
    let { role } = item;

    if(index == 0){
      return (
          <div key={index * 2} className="eachCharacter">
            <div className="eachCharacterImg">
              <img onError={(e) => e.target.src = BrokenImage } src={images.webp.image_url} alt={name} />
            </div>
            <div className="eachCharacterDetzs">
              <div className="ecn">{name}</div>
              <div className="ecva">{role}</div>
            </div>
          </div>
      )
    }else{
      return(
        <div key={index * 2} className="eachCharacter">
          <div className="eachCharacterImg">
            <img src={images.webp.image_url} alt={name} />
          </div>
          <div className="eachCharacterDetzs">
            <div className="ecn">{name}</div>
            <div className="ecva">{role}</div>
          </div>
        </div>
      )
    }
    
  })
  : (types == "movies" && result != undefined)
  ? result?.cast?.map((item, index) => {
    return(
      <div key={index * 5} className="each_dept">
        <div className="each_dept_img">
          <img onError={(e) => e.target.src = BrokenImage } src={`https://image.tmdb.org/t/p/w500${item?.profile_path}`} alt="" />
        </div>
        <div className="each_dept_dets">
          <div className="worker_name">{item?.name}</div>
          <div className="worker_extras">{item?.character}</div>
        </div>
      </div>
    )
  })
  : ""

  let otherDepts = []
  let filteredDept = []

  if((types == "movies" || types == "series") && result?.crew){

    otherDepts = result?.crew?.map((item) => {
      return item.department
    })

    filteredDept = otherDepts.reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], []).sort()
  }


  let nav = count.current.map((item, index) => {
    return (<li style={Lang == item ? statusAct : {}} onClick={() => setLang(item)} key={index}>{item}</li>)
  })

  return (
    <section className="casts_crews">
      <AM_Header bgClr={statusClr} />

      <div className={types == "anime" ? "casts_crew" : "casts_crew ouster"}>
        {
          (types == "anime" || types == "manga")
          ? 
            <>
              {types == "anime" && <div className="casts_crews_nav">
                <div style={statusStyl} className="languageByCast">Cast Language</div>
                <ol>
                  {nav}
                </ol>
              </div>}
              <div className="cast_crews_data">
                {types == "anime" && <div style={{display: "none"}} className="xs_casts_crew_nav">
                  <ol>
                    {nav}
                  </ol>
                </div>}
                <div className={types == "anime" ? "C_C_D_M" : "C_C_D_M ouster"}>
                  {dynAM}
                </div>
              </div>
            </>
          : 
          <div className={"tmdb_casts_crews"}>

            <div className="sub_1_tmdb">
              <div className="tmdb_casts_head">Casts</div>
              <div className="tmdb_casts_cont">
                {dynAM}
              </div>
            </div>

            <div className="sub_2_tmdb">
              <div className="tmdb_crew_head">Crews</div>
              <div className="tmdb_crews_cont">
                {
                  filteredDept.map((item, index) => {
                    let heading = item;
                    return (
                      <div key={index} className="tmdb_crews_data">
                        <div className="crew_department_head">{heading}</div>
                        <div className='crew_department_items'>
                          {
                            ...result?.crew?.map((item) => {
                              if(item.department != heading)return
                              return(
                                <div className="each_dept">
                                  <div className="each_dept_img">
                                    <img onError={(e) => e.target.src = BrokenImage } src={`https://image.tmdb.org/t/p/w500${item?.profile_path}`} alt="" />
                                  </div>
                                  <div className="each_dept_dets">
                                    <div className="worker_name">{item?.name}</div>
                                    <div className="worker_extras">{item?.job}</div>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            

          </div>
        }
      </div>
    </section>
  )
}

export default AM_Casts