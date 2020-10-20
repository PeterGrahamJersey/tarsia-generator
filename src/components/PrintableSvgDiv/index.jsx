import React from 'react'
import TarsiaGrid from "../TarsiaGrid"
import appConfig from '../../config'

const printGridWidth = 2.5 // # triangles of same orientation
const printGridHeight = 2 // # triangles
const printGrid = [
  {row:1, col:2},
  {row:1, col:3},
  {row:1, col:4},
  {row:1, col:5},
  {row:2, col:2},
  {row:2, col:3},
  {row:2, col:4},
  {row:2, col:5},
]

const PrintPage = (props) => {
  const side = appConfig.triangle.side
  const ratio = appConfig.pdf.ratio
  const width = side * printGridWidth
  const height = width / ratio
  const printGridMargin = side / 2
  // Check that height >= print height * side
  if (printGridHeight * side <= height) {console.log('Waring: print grid not tall enough for tarsia')}
  return (
      <svg id={props.id} viewBox={printGridMargin + " 0 " + width + " " + height} width={width} height={height}>
        <TarsiaGrid config={props.config} values={props.values}/>
      </svg>
  )
} 

const PrintSvgDiv = (props) => {
    // TODO: Replace with a more efficient method, probably map or zip?
    let gridTriangleId=0;
    var printTriangle;
    let printArray = [];
    while (gridTriangleId<props.grid.length) {
      let printPageConfig = []
      for (printTriangle in printGrid) {
        // Map display grid to print grid
        printPageConfig.push({
          row: printGrid[printTriangle]["row"],
          col: printGrid[printTriangle]["col"],
          values: props.grid[gridTriangleId]["values"]
        })
        gridTriangleId = gridTriangleId+1
        if (gridTriangleId === props.grid.length) {
          break;
        }
      }
      // Generate print tarsiaGrids
      printArray.push(<PrintPage id={props.id + "-" + printArray.length} config={printPageConfig} values={props.values}/>)
    }

  return (
    <div id={props.id}>
      {printArray}
    </div>
  )
}

export default PrintSvgDiv