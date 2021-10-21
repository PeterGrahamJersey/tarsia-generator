import React from 'react'
import { appConfig } from '../../data/config'

const Triangle = ({row, col, values, config, textOrSvg}) => {
  const {side, style, text, height} = config
  const orientation = ((col + row) % 2 === 0) ? 'down' : 'up'
  const rotate = orientation === 'up' ? 180 : 0
  const translateX = (col-1) * side / 2
  const translateY = (row-1) * height
  const transform = `translate(${translateX},${translateY}) rotate(${rotate} ${side/2},${height/2})`

  const Text = ({children, ...props}) => {
    let linesText = [...children].reverse();
    // console.log(linesText)
    const linesSvgText = linesText.map((line, index) =>
        <text x={side/2} y={-text.paddingY - appConfig.triangle.text.yHeightStep * index} style={text.style} textAnchor='middle' {...props}>
          {line}
        </text>
    )
    return (
      <g>
        {linesSvgText}
      </g>
    )
  }

  const Svg = ({children, ...props}) => {
    return (
      <g y={-text.paddingY} dangerouslySetInnerHTML={{'__html':children}} {...props}/> // should this take children or a string?
    )
  }
  
  const SvgElement = ({children, textOrSvg, ...props}) => {
    if (textOrSvg === 'svg') { 
      return (
        <Svg {...props}>{children}</Svg>
      ) 
    }
    else if (textOrSvg === 'text') {
      return ( 
      <Text {...props}>{children}</Text>
      )
    }
  }

  return (
    <g transform={transform}>
      <polygon points={`0,0 ${side},0 ${side/2},${height}`} style={style}/>
      <SvgElement textOrSvg={textOrSvg} transform={`rotate(180 ${side/2},0)`}>
        {values[0]}
      </SvgElement>
      <SvgElement textOrSvg={textOrSvg} transform={'rotate(60 0,0)'}>
        {values[1]}
      </SvgElement>
      <SvgElement textOrSvg={textOrSvg} transform={`rotate(300 ${side},0)`}>
        {values[2]}
      </SvgElement>
    </g>
    )
}



export default Triangle;