import React from 'react'
import appConfig from './config'

const Triangle = (props) => {
  const orientation = ((props.col + props.row) % 2 === 0) ? "down" : "up"
  const rotate = orientation === "up" ? 180 : 0
  const translate_x = (props.col-1) * appConfig.side / 2
  const translate_y = (props.row-1) * appConfig.height
  const transform = "translate("+translate_x+","+translate_y+") rotate("+rotate+" "+appConfig.side/2+","+appConfig.height/2+")"

  return (
    <g transform={transform}>
      <polygon points={"0,0 "+appConfig.side+",0 "+appConfig.side/2+","+appConfig.height} style={appConfig.styleTarsiaTriangle}/>
      <g textAnchor="middle">
        <text x={appConfig.side/2} y={-appConfig.triangleYTextPadding} transform={"rotate(180 "+appConfig.side/2+",0)"} style={appConfig.styleTarsiaText}>
          {props.values[0]}
        </text>
        <text x={appConfig.side/2} y={-appConfig.triangleYTextPadding} transform={"rotate(60 0,0)"} style={appConfig.styleTarsiaText}>
          {props.values[1]}
        </text>
        <text x={appConfig.side/2} y={-appConfig.triangleYTextPadding} transform={"rotate(300 "+appConfig.side+",0)"} style={appConfig.styleTarsiaText}>
          {props.values[2]}
        </text>
      </g>
    </g>
    )
}

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
      grid.push(<Triangle row={tri.row} col={tri.col} values={valueArray}/>)
    }

    return (
      <g>
        {grid}
      </g>
    )
  }
}



export default TarsiaGrid

