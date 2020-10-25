import React from 'react'
import appConfig from '../../data/config'

const GridIcon = ({icon, onClick}) => {
  const w = appConfig.icons.width
  const h = appConfig.icons.height
  return (
    <button className='icon-button' onClick={onClick}>
      <svg viewBox={`${-w*0.05} ${-h*0.05} ${w*1.1} ${h*1.1}`}>
        {icon}
      </svg>
    </button>
  )
}

export default GridIcon
