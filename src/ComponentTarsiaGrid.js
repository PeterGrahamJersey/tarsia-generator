import React from 'react'

function triangle(row, col, values) {
  const side = 150
  const h = Math.sqrt(3)*side/2
  const orientation = ((col + row) % 2 === 0) ? "down" : "up"
  const rotate = orientation === "up" ? 180 : 0
  const translate_x = (col-1) * side / 2
  const translate_y = (row-1) * h
  const transform = "translate("+translate_x+","+translate_y+") rotate("+rotate+" "+side/2+","+h/2+")"
  const textStyle = {
    fill: "red"
  }
  const textPadding = [10, 5] //x, y
  return (
    <g transform={transform}>
      <polygon 
        points={"0,0 "+side+",0 "+side/2+","+h}
        style={{
          fill:"white",
          stroke:"black",
          strokeWidth:2
        }} 
      />
      <g textLength={side-2*textPadding[0]} style={textStyle}>
        <text x={side+textPadding[0]} y={-textPadding[1]} transform={"rotate(180 "+side+",0)"}>
          {values[0]}
        </text>
        <text x={textPadding[0]} y={-textPadding[1]} transform={"rotate(60 0,0)"}>
          {values[1]}
        </text>
        <text x={side/2+textPadding[0]} y={h-textPadding[1]} transform={"rotate(300 "+side/2+","+h+")"}>
          {values[2]}
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
      grid.push(triangle(tri.row, tri.col, valueArray))
    }

    //console.log(this.values)
    const testVal = this.values["30"] ? this.values["30"]["a"] : "NoVal"
    return (
      <g>
        {grid}
        <text x="10" y="20" fill="white">{testVal}</text>
      </g>
    )
  }
}



export default TarsiaGrid

