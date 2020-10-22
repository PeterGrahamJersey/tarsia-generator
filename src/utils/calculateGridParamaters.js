export default ((grid) => {
  console.log(grid)
  const rows = grid.map(grid => grid.row)
  const cols = grid.map(grid => grid.col)
  const values = grid.map(grid => grid.values).flat(1).map(value => value ? parseInt(value.slice(0, -1)) : null) // flatten value arrays into single array, and extract the question number
  const width = (Math.max(...cols) - Math.min(...cols)) * 0.5 + 1 // triangles of same orientation
  const height = (Math.max(...rows) - Math.min(...rows)) + 1 // triangles
  const nQuestions = Math.max(...values)
  return {
    nQuestions:nQuestions,
    width:width,
    height:height
  }
})