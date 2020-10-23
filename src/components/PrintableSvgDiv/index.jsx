import React from 'react'
import TarsiaGrid from '../TarsiaGrid'
import appConfig from '../../data/config'
import printGrid from '../../data/printGrid'
import calculateGridParameters from '../../utils/calculateGridParameters'

const PrintPage = ({id, grid, gridParameters, questions, answers}) => {
  const side = appConfig.triangle.side
  const ratio = appConfig.pdf.ratio
  const width = side * gridParameters.width
  const height = width / ratio
  const printGridMargin = side / 2
  // Check that height >= print height * side
  if (gridParameters.height * side <= height) {console.log('Waring: print grid not tall enough for tarsia')}
  return (
      <svg id={id} viewBox={`${printGridMargin} 0 ${width} ${height}`} width={width} height={height}>
        <TarsiaGrid id={`${id}-tarsiaGrid`} grid={grid} questions={questions} answers={answers} />
      </svg>
  )
} 

const PrintableSvgDiv = ({id, grid, questions, answers}) => {
    // TODO: Replace with a more efficient method, probably map or zip?
    const gridParameters = calculateGridParameters(printGrid);
    let gridTriangleId=0;
    var printTriangle;
    let printArray = [];
    while (gridTriangleId<grid.length) {
      let printPageGrid = []
      for (printTriangle in printGrid) {
        // Map display grid to print grid
        printPageGrid.push({
          location: {
            row: printGrid[printTriangle].location.row,
            col: printGrid[printTriangle].location.col
          },
          values: grid[gridTriangleId]['values']
        })
        gridTriangleId = gridTriangleId+1
        if (gridTriangleId === grid.length) {
          break;
        }
      }
      // Generate print tarsiaGrids
      printArray.push(<PrintPage id={`${id}-${printArray.length}`} key={`${id}-${printArray.length}`} grid={printPageGrid} gridParameters={gridParameters} questions={questions} answers={answers} />)
    }

  return (
    <div id={id}>
      {printArray}
    </div>
  )
}

export default PrintableSvgDiv