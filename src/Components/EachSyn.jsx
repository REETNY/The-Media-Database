import React from 'react'

const EachSyn = (props) => {
    const {SYNBG} = props?.file
  return (
    <div className="xsSynopsis">
      <span className="sts">{SYNBG.slice(0, 300)}...</span>
    </div>
  )
}

export default React.memo(EachSyn)