import React from 'react'
import appConfig from './config'

const s = appConfig.icons.size
const h = Math.sqrt(3)/2 * s
const gridIcons = {
  triangleGrid: <polygon points={`${s/2},0 ${s},${h} 0,${h}`} style={appConfig.icons.style}/>,
  smallTriangleGrid: <polygon points={`${s/2},${h/8} ${7*s/8},${7*h/8} ${s/8},${7*h/8}`} style={appConfig.icons.style}/>,
  hexGrid: <polygon points={`${s/4},0 ${3*s/4},0 ${s},${h/2} ${3*s/4},${h} ${s/4},${h} 0,${h/2}`} style={appConfig.icons.style}/>,
  smallHexGrid: <polygon points={`${s/4},${h/4} ${3*s/4},${h/4} ${7*s/8},${h/2} ${3*s/4},${3*h/4} ${s/4},${3*h/4} ${s/8},${h/2}`} style={appConfig.icons.style}/>
}

export default gridIcons