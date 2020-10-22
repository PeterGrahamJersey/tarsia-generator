import React from 'react'
import Triangle from '../Triangle'
import appConfig from '../../data/config'

const TarsiaGrid = ({id, grid, questions, answers}) => {
  
  const getTriangleValues = ({triangleValueCodeArray, questions, answers}) => triangleValueCodeArray.map(valueCode => {
      if (valueCode) { // handles nulls
        let [questionNumber, questionOrAnswer] = [valueCode.substr(0,valueCode.length-1), valueCode.slice(-1)] // split into number and q/a
        const values = questionOrAnswer === 'q' ? questions : answers
        const value = values[questionNumber] ? values[questionNumber] : valueCode
        return value
      }
      return null
    })

  const tarsiaGrid = grid.map(triangle => <Triangle row={triangle.location.row} col={triangle.location.col} values={getTriangleValues({triangleValueCodeArray:triangle.values, questions, answers})} config={appConfig.triangle} key={`${id}-${triangle.location.row}-${triangle.location.col}`}/>)

  return (
    <g>
      {tarsiaGrid}
    </g>
  )
}

export default TarsiaGrid

