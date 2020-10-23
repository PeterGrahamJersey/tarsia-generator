import React from 'react'
import appConfig from '../../data/config'
import TarsiaGrid from '../TarsiaGrid'

const PreviewSvg = ({id, grid, gridParams, questions, answers}) => {
  // Assuming our SVG has width = height
  const viewBoxMinWidth = gridParams.width * appConfig.triangle.side
  const viewBoxMinHeight = gridParams.height * appConfig.triangle.height
  const ViewBoxSide = Math.max(viewBoxMinWidth, viewBoxMinHeight)

  return (
    <svg viewBox={`0 0 ${ViewBoxSide} ${ViewBoxSide}`} height='600' width='600'>
      <TarsiaGrid id={id} grid={grid} questions={questions} answers={answers}/>
    </svg>
  )
}

export default PreviewSvg