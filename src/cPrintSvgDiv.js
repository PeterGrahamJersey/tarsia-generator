import React from 'react'
import TarsiaGrid from "./cTarsiaGrid"

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
  // Print grid dim 3*side x 2h = 2*Math.sqrt(3)/2 * SIDE
  // A4 size: 210 x 297mm
  //TODO get from config
  //let side = 150 //px
  //let h = Math.sqrt(3)/2 * side
  let a4ratio = 297/210
  return (
    //<div id={props.id}>
      <svg id={props.id} viewBox={"0 0 " + 525 + " " + 525/a4ratio} height="525" width={525/a4ratio}>
        <TarsiaGrid config={props.config} values={props.values}/>
      </svg>
    //</div>
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
    <div id={props.id} style={{display:"none"}}>
      {printArray}
    </div>
  )
}

export default PrintSvgDiv