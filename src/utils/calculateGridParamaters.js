const calculateGridParameters = (grid) => {
  const rows = grid.map(grid => grid.location.row)
  const cols = grid.map(grid => grid.location.col)
  const values = grid.map(grid => grid.values).flat(1).map(value => value ? parseInt(value.slice(0, -1)) : null) // flatten value arrays into single array, and extract the question number
  const width = (Math.max(...cols) - Math.min(...cols)) * 0.5 + 1 // triangles of same orientation
  const height = (Math.max(...rows) - Math.min(...rows)) + 1 // triangles
  const nQuestions = new Set(values).size -1 // counts unique values, -1 assumes we always have 'null' which is reasonable for Tarsia puzzles
  return {
    nQuestions:nQuestions,
    width:width,
    height:height
  }
}

export default calculateGridParameters