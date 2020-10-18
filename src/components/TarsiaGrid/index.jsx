import React from 'react'
import Triangle from '../Triangle'

import appConfig from '../../config'

const TarsiaGrid = ({ id, config, values }) => {
  const grid = []
  for (let tri of config) {
    let valueArray = []
    for (let valueCode of tri.values) { // lookup the value code from the config
      if (valueCode) { // handles nulls
        let valueCodeSplit = [valueCode.substr(0,valueCode.length-1), valueCode.slice(-1)] // split into number and q/a
        if (values[valueCodeSplit[0]]) { // handles nulls
          valueArray.push(values[valueCodeSplit[0]][valueCodeSplit[1]]) // add the value based on the question number and q/a
        } else (
          valueArray.push(valueCode)
        )
      } else {
        valueArray.push(null) // null handling
      }
    }
    grid.push(<Triangle row={tri.row} col={tri.col} values={valueArray} config={appConfig.triangle} />)
  }

  return (
    <g>
      {grid}
    </g>
  )
}

export default TarsiaGrid

