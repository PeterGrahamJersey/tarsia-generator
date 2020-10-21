import React from 'react'
import Triangle from '../Triangle'
import { useData } from '../ContextData'

const TarsiaGrid = ({ id }) => {
  const { config, hexGrid, values } = useData()
  const formatGridLocationValueArray = ({ values, locationValues }) => locationValues.map(value => {
    if (value) {
      // split into number and q/a
      const valueSplit = [value.substr(0, value.length - 1), value.slice(-1)]

      // handles nulls
      if (values[valueSplit[0]]) {
        // add the value based on the question number and q/a
        return values[valueSplit[0]][valueSplit[1]]
      }

      return value
    }

    return null;
  })

  return (
    <g id={id}>
      {hexGrid && hexGrid.map((location, index) => {
        const valueArray = formatGridLocationValueArray({ values, locationValues: location.values })
        return <Triangle key={index} row={location.row} col={location.col} values={valueArray} config={config.triangle} />
      })}
    </g>
  )
}

export default TarsiaGrid;
