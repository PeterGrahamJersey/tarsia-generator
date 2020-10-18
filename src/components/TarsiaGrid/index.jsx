import React from 'react'
import Triangle from '../Triangle'

import appConfig from '../../config'

class TarsiaGrid  extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.config = props.config
    this.values = props.values
  }

  render() {
    const grid = []
    for (let tri of this.config) {
      let valueArray = []
      for (let valueCode of tri.values) { // lookup the value code from the config
        if (valueCode) { // handles nulls
          let valueCodeSplit = [valueCode.substr(0,valueCode.length-1), valueCode.slice(-1)] // split into number and q/a
          if (this.values[valueCodeSplit[0]]) { // handles nulls
            valueArray.push(this.values[valueCodeSplit[0]][valueCodeSplit[1]]) // add the value based on the question number and q/a
          } else (
            valueArray.push(valueCode)
          )
        } else {
          valueArray.push(null) // null handling
        }
      }
      grid.push(<Triangle row={tri.row} col={tri.col} values={valueArray} appConfig={appConfig} />)
    }

    return (
      <g>
        {grid}
      </g>
    )
  }
}



export default TarsiaGrid

