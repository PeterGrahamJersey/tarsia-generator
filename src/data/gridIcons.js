import React from 'react'
import appConfig from './config'

const w = appConfig.icons.width
const h = appConfig.icons.height
const gridIcons = {
  triangleGrid: <polygon points={`${w/2},0 ${w},${h} 0,${h}`}/>,
  smallTriangleGrid: <polygon points={`${w/2},${h/8} ${7*w/8},${7*h/8} ${w/8},${7*h/8}`}/>,
  hexGrid: <polygon points={`${w/4},0 ${3*w/4},0 ${w},${h/2} ${3*w/4},${h} ${w/4},${h} 0,${h/2}`}/>,
  smallHexGrid: <polygon points={`${w/4},${h/4} ${3*w/4},${h/4} ${7*w/8},${h/2} ${3*w/4},${3*h/4} ${w/4},${3*h/4} ${w/8},${h/2}`}/>
}

export default gridIcons