import React from 'react'
import appConfig from '../../data/config'

const GridIcon = ({icon, onClick}) => {
  const s = appConfig.icons.size
  return (
    <button onClick={onClick}>
      <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
        {icon}
      </svg>
    </button>
  )
}

export default GridIcon