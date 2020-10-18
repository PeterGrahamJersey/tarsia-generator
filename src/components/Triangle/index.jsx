import React from 'react';


const Triangle = ({ row, col, values, appConfig }) => {

  const { side, height, styleTarsiaTriangle, triangleYTextPadding, styleTarsiaText } = appConfig;
  const orientation = ((col + row) % 2 === 0) ? "down" : "up"
  const rotate = orientation === "up" ? 180 : 0
  const translateX = (col-1) * side / 2
  const translateY = (row-1) * height
  const transform = `translate(${translateX},${translateY}) rotate(${rotate} ${side / 2},${height/2})`
  
  return (
    <g transform={transform}>
      <polygon points={`0,0 ${side}, 0 ${side / 2}, ${height}`} style={styleTarsiaTriangle}/>
      <g textAnchor="middle">
        <text x={side/2} y={-triangleYTextPadding} transform={`rotate(180 ${side / 2},0)`} style={styleTarsiaText}>
          {values[0]}
        </text>
        <text x={side/2} y={-triangleYTextPadding} transform={"rotate(60 0,0)"} style={styleTarsiaText}>
          {values[1]}
        </text>
        <text x={side/2} y={-triangleYTextPadding} transform={`rotate(300 ${side},0)`} style={styleTarsiaText}>
          {values[2]}
        </text>
      </g>
    </g>
    )
}


export default Triangle;