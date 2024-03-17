import styled, { css } from "styled-components"
import {keyframes} from 'styled-components'

const anime = (y) => keyframes`
from{
    transform: rotate(0deg);
}
to{
    transform: rotate(${y}deg)
}
`

const anime2 = (y) => keyframes`
0%{
    transfrom: rotate(0deg)
}
50%{
    transform: rotate(180deg)
}
100%{
    transform: rotate(${y}deg)
}
`

const remove = keyframes`
from{
    opacity: 1
}
to{
opacity: 0
}
`

const HalfCircle1 = styled.div`
width: 50%;
position: absolute;
height: 100%;
z-index: 4;
transform-origin: 100%;
background: ${props => props.$clr};
animation: ${props => anime(props.$fs)} 2s linear 2s forwards 
`

const HalfCircle2 = styled.div`
width: 50%;
position: absolute;
height: 100%;
z-index: 5;
transform-origin: 100%;
background: ${props => props.$clr};
animation: ${props => props.$move > 50 ? anime2(props.$sc) : ""} 4s linear 2s forwards;
`

const HalfCircle3 = styled.div`
width: 52%;
position: absolute;
height: 100%;
z-index: 6;
transform-origin: 100%;
background: ${props => props.$clr ? props.$clr : "black"};
display: block;
animation: ${props => (props.$show == "false" ? css`${remove} 0.01s linear 4s forwards` : "")}
`


export  {HalfCircle1, HalfCircle2, HalfCircle3}