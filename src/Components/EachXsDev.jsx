import React from 'react'
import EachDetz1 from '../Components/EachDetz1';
import EachSyn from '../Components/EachSyn';

const EachXsDev = (props) => {
  let {firstAngle, secondAngle, sc, ttl, RFRM, RTRM, color, wImg, SYNBG} = props.file
  return (
    <div className='xsDev'>
        <EachDetz1 file={{firstAngle, secondAngle, sc, ttl, RFRM, RTRM, color, wImg}} />
        { SYNBG == null ? <EachSyn file={{SYNBG : "No Information"}} /> : <EachSyn file={{SYNBG}} /> }
    </div>
  )
}

export default React.memo(EachXsDev)