import React from 'react'
import { HalfCircle1, HalfCircle2, HalfCircle3 } from "../StyledComponent/components"

const Score_Chart = (props) => {
  const { color, color2, firstAngle, secondAngle, score} = props.data
    const sc = parseFloat(Math.floor(score * 10))

  return (
    <div className='score_chart'>
        <div className="chart_wrapper">
          <div className="innerCircle">
            <canvas className="innerCanvas"></canvas>

            <div className="trackCircle">
              <canvas className="trackCanvas" style={{background: `${color2}`}}></canvas>
            </div>

            <div className="outerCircle">
              <canvas className="outerCanvas"></canvas>
              <div className="showScore_percent">
                <div className="scorePercent">{sc}</div>
                <span className="percentage_icon">
                  <sup>%</sup>
                </span>
              </div>
            </div>

            <div className="comp_circle">
              <HalfCircle1 $clr={color} $fs={firstAngle} ></HalfCircle1>
              <HalfCircle2 $clr={color} $move={sc} $sc={firstAngle+secondAngle} ></HalfCircle2>
              {sc > 50 ? <HalfCircle3 $clr={color2} $show="false" ></HalfCircle3> : <HalfCircle3 $clr={color2} $show="true"></HalfCircle3>}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Score_Chart