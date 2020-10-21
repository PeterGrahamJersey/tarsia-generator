import React from 'react'
import TarsiaGrid from "../TarsiaGrid"
import { useData } from '../ContextData'

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



const PrintableSVGDiv = ({ id }) => {
  const { config, hexGrid, values } = useData()
    // TODO: Replace with a more efficient method, probably map or zip?
    let gridTriangleId=0;
    var printTriangle;
    let printArray = [];

    const PrintPage = () => {
      let width = config.side * printGridWidth
      let height = width / config.a4ratio
      let printGridMargin = config.side / 2
      // Check that height >= print height * side
      console.log("w:", width, "h:", height, "marginremove:", printGridMargin)
      if (printGridHeight * config.side <= height) {console.log('Waring: print grid not tall enough for tarsia')}
      return (
          <svg id={id} viewBox={printGridMargin + " 0 " + width + " " + height} width={width} height={height}>
            <TarsiaGrid/>
          </svg>
      )
    } 

    while (gridTriangleId < hexGrid.length) {
      let printPageConfig = []
      for (printTriangle in printGrid) {
        // Map display grid to print grid
        printPageConfig.push({
          row: printGrid[printTriangle]["row"],
          col: printGrid[printTriangle]["col"],
          values: hexGrid[gridTriangleId]["values"]
        })
        gridTriangleId = gridTriangleId+1
        if (gridTriangleId === hexGrid.length) {
          break;
        }
      }
      // Generate print tarsiaGrids
      printArray.push(<PrintPage id={id + "-" + printArray.length} config={printPageConfig} values={values}/>)
    }



  return (
    <div id={id}>
      {printArray}
    </div>
  )
}

export default PrintableSVGDiv