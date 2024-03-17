import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { saveUrl, urlQueries, setBtnQuery } from '../app/Oth/FilterSlice1';

const Pagination = ({paginate}) => {
  let dispatch = useDispatch()
  let {current_page, last_visible_page, items} = paginate;
  const [paramet, setParams] = useSearchParams();
  const currUrl = useSelector(urlQueries);

  const addNewPage = (obj) => {
    let params = currUrl == "" ? (location.search) : (currUrl);
    let param = new URLSearchParams(params);
    param.set(obj.key, obj.val.i)
    setParams(() => {
      return (param)
    })
    
    takeQuery(param)
  }

  function takeQuery(param){
    let SP = param.toString();

    let refinedUrl = (`?${SP}`);

    dispatch(saveUrl(`${refinedUrl}`))
    dispatch(setBtnQuery({val: false}))
    document.body.scrollTop = 0; // safari
    document.documentElement.scrollTop = 0; //chrome and firefox
  }

  let PGL = []

  if(current_page >= 5){
      let SN = current_page - 2;
      if((current_page+3 < last_visible_page)){
          for(let i = SN; i <= current_page + 3; i++){
              PGL.push(<li key={i} onClick={() => addNewPage({key: "page", val:{i}})} className={current_page == i ? "PGL active" : "PGL"} >{i}</li>)
          }
      }else{
          for(let i = SN; i <= last_visible_page; i++){
              PGL.push(<li key={i} onClick={() => addNewPage({key: "page", val:{i}})} className={current_page == i ? "PGL active" : "PGL"} >{i}</li>)
          }
      }
  }else if(last_visible_page < 5){
    for(let i = 1; i <= last_visible_page; i++){
        PGL.push(<li key={i} onClick={() => addNewPage({key: "page", val:{i}})} className={current_page == i ? "PGL active" : "PGL"} >{i}</li>)
    }
  }
  else{
    for(let i = 1; i <= 5; i++){
      PGL.push(<li key={i} onClick={() => addNewPage({key: "page", val:{i}})} className={current_page == i ? "PGL active" : "PGL"} >{i}</li>)
    }
  }

return (
  <>
    {items.count > 1 && <div>
      {items.count && <ul className="pagiUtils">
        {PGL}
      </ul>}
    </div>}
  </>
)
}

export default Pagination