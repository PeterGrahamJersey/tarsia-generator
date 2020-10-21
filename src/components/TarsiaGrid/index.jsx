import React from 'react'
import Triangle from '../Triangle'
import appConfig from '../../config'

const TarsiaGrid = ({id, config, questions, answers}) => {
  const grid = []
  for (let triangle of config) {
    let valueArray = []
    for (let valueCode of triangle.values) { // lookup the value code from the config
      if (valueCode) { // handles nulls
        let [questionNumber, questionOrAnswer] = [valueCode.substr(0,valueCode.length-1), valueCode.slice(-1)] // split into number and q/a
        const values = questionOrAnswer === 'q' ? questions : answers
        const value = values[questionNumber] ? values[questionNumber] : valueCode
        valueArray.push(value) // add the value based on the question number and q/a
      } else {
        valueArray.push(null) // null handling
      }
    }
    grid.push(<Triangle row={triangle.row} col={triangle.col} values={valueArray} config={appConfig.triangle} key={`${id}-${triangle.row}-${triangle.col}`}/>)
  }

  return (
    <g>
      {grid}
    </g>
  )
}

export default TarsiaGrid

