import React from 'react'
import {IconButton} from 'theme-ui'

const GridIcon = ({ariaLabel, icon, onClick}) => {
  return (
    <IconButton aria-label={ariaLabel} onClick={onClick}>
      <img alt='' src={icon} width='100%'/>
    </IconButton>
  )
}

export default GridIcon
