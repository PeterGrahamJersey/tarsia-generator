import React from 'react'
import appConfig from '../../data/config'

const GridIcon = ({icon, onClick}) => {
  const w = appConfig.icons.width
  const h = appConfig.icons.height
  return (
    <button className='icon-button' onClick={onClick}>
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
        {icon}
      </svg>
    </button>
  )
}

export default GridIcon
