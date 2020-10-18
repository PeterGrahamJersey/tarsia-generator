import React from 'react';

const Triangle = ({ row, col, values, config }) => {
  const orientation = ((col + row) % 2 === 0) ? "down" : "up"
  const rotate = orientation === "up" ? 180 : 0
  const translateX = (col - 1) * config.side / 2
  const translateY = (row - 1) * config.height
  const transform = `translate(${translateX},${translateY}) rotate(${rotate} ${config.side / 2},${config.height / 2})`

  const Text = ({ children, ...props }) => {
    return (
      <text x={config.side / 2} y={-config.text.paddingY} style={config.text.style} {...props}>
        {children}
      </text>
    )
  }

  return (
    <g transform={transform}>
      <polygon points={`0,0 ${config.side}, 0 ${config.side / 2}, ${config.height}`} style={config.style} />
      <g textAnchor="middle">
        <Text transform={`rotate(180 ${config.side / 2},0)`}>
          {values[0]}
        </Text>
        <Text transform={"rotate(60 0,0)"}>
          {values[1]}
        </Text>
        <Text transform={`rotate(300 ${config.side},0)`}>
          {values[2]}
        </Text>
      </g>
    </g>
  )
}


export default Triangle;