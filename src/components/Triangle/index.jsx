import React from 'react'
import { appConfig } from '../../data/config'

const Triangle = ({row, col, values, config}) => {
  const {side, style, text, height} = config
  const orientation = ((col + row) % 2 === 0) ? 'down' : 'up'
  const rotate = orientation === 'up' ? 180 : 0
  const translateX = (col-1) * side / 2
  const translateY = (row-1) * height
  const transform = `translate(${translateX},${translateY}) rotate(${rotate} ${side/2},${height/2})`

  const Text = ({children, ...props}) => {
    let linesText = [...children].reverse();
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

  return (
    <g transform={transform}>
      <polygon points={`0,0 ${side},0 ${side/2},${height}`} style={style}/>
      <Text transform={`rotate(180 ${side/2},0)`}>
        {values[0]}
      </Text>
      <Text transform={'rotate(60 0,0)'}>
        {values[1]}
      </Text>
      <Text transform={`rotate(300 ${side},0)`}>
        {values[2]}
      </Text>
    </g>
    )
}

export default Triangle;