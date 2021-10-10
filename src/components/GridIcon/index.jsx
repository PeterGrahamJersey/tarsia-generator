import React from 'react'
import {IconButton} from 'theme-ui'

import {appConfig} from '../../data/config'

const GridIcon = ({ariaLabel, icon, onClick}) => {
  const w = appConfig.icons.width
  const h = appConfig.icons.height
  return (
    <IconButton aria-label={ariaLabel} onClick={onClick}>
      <svg viewBox={`${-w*0.05} ${-h*0.05} ${w*1.1} ${h*1.1}`}>
        {icon}
      </svg>
    </IconButton>
  )
}

export default GridIcon
