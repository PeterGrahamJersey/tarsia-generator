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

const PrintPage = ({id, config, questions, answers}) => {
  const side = appConfig.triangle.side
  const ratio = appConfig.pdf.ratio
  const width = side * printGridWidth
  const height = width / ratio
  const printGridMargin = side / 2
  // Check that height >= print height * side
  if (printGridHeight * side <= height) {console.log('Waring: print grid not tall enough for tarsia')}
  return (
      <svg id={id} viewBox={printGridMargin + " 0 " + width + " " + height} width={width} height={height}>
        <TarsiaGrid id={`${id}-tarsiaGrid`} config={config} questions={questions} answers={answers} />
      </svg>
  )
} 

const PrintSvgDiv = ({id, questions, answers, grid}) => {
    // TODO: Replace with a more efficient method, probably map or zip?
    let gridTriangleId=0;
    var printTriangle;
    let printArray = [];
    while (gridTriangleId<grid.length) {
      let printPageConfig = []
      for (printTriangle in printGrid) {
        // Map display grid to print grid
        printPageConfig.push({
          row: printGrid[printTriangle]["row"],
          col: printGrid[printTriangle]["col"],
          values: grid[gridTriangleId]["values"]
        })
        gridTriangleId = gridTriangleId+1
        if (gridTriangleId === grid.length) {
          break;
        }
      }
      // Generate print tarsiaGrids
      printArray.push(<PrintPage id={`${id}-${printArray.length}`} key={`${id}-${printArray.length}`} config={printPageConfig} questions={questions} answers={answers} />)
    }

  return (
    <div id={id}>
      {printArray}
    </div>
  )
}

export default PrintSvgDiv