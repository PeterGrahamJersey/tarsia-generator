import React from 'react'
import appConfig from '../../data/config'
import TarsiaGrid from '../TarsiaGrid'

const PreviewSvg = ({id, grid, gridParams, questions, answers}) => {
  // Assuming our SVG has width = height
  const viewBoxOffsetX = (gridParams.minCol - 1)* appConfig.triangle.side / 2
  const viewBoxMinWidth = gridParams.width * appConfig.triangle.side
  const viewBoxMinHeight = gridParams.height * appConfig.triangle.height
  //const ViewBoxSide = Math.max(viewBoxMinWidth, viewBoxMinHeight)

  return (
    <svg viewBox={`${viewBoxOffsetX} 0 ${viewBoxMinWidth} ${viewBoxMinHeight}`}>
      <TarsiaGrid id={id} grid={grid} questions={questions} answers={answers}/>
    </svg>
  )
}

export default PreviewSvg