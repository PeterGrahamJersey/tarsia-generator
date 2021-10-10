const calculateGridParameters = (grid) => {
  const rows = grid.map(grid => grid.location.row)
  const cols = grid.map(grid => grid.location.col)
  const values = grid.values ? grid.map(grid => grid.values).flat(1).map(value => value ? parseInt(value.slice(0, -1)) : null) : null // flatten value arrays into single array, and extract the question number
  const minCol = Math.min(...cols)
  const width = (Math.max(...cols) - Math.min(...cols)) * 0.5 + 1 // triangles of same orientation
  const height = (Math.max(...rows) - Math.min(...rows)) + 1 // triangles
  const nQuestions = values ? new Set(values).size - 1 : null // counts unique values, -1 assumes we always have 'null' which is reasonable for Tarsia puzzles
  return {
    minCol:minCol,
    nQuestions:nQuestions,
    width:width,
    height:height
  }
}

// Handling multi-line
const smartSplitByNChars = (text, n) => {
  if (text && text.length>n) {
    try {
      const r = new RegExp('(^|\\s).{0,'+(n+1)+'}$');
      const matchedString = text.match(r)[0].trim()
      const remainingString = text.replace(r,'')
      return [remainingString, matchedString]
    } catch {
      // If the regex fails, resort to n characters
      const matchedString = text.substring(text.length - n);
      const remainingString = text.substring(0, text.length - n) + '-';
      return [remainingString, matchedString]
    }
  }
  return [text]
}
const splitUpText = (text, triangleTextConfig) => {
  // if shorter than 1st line, don't split it up
  let textArray = [text]
  if (text && text.length > triangleTextConfig.style.lineLength[0]) {
    // Split with regexp
    var i;
    var splitText;
    for(i=0; i<triangleTextConfig.maxLines; i++) {
      let lineLength = triangleTextConfig.style.lineLength[i]
      let textToSplit = textArray.shift()
      if (textToSplit.length <= lineLength) {
        // if text length less than line length, no need to split it up
        splitText = [textToSplit]
        textArray = splitText.concat(textArray)
        return textArray
      } else {
        splitText = smartSplitByNChars(textToSplit, lineLength)
        textArray = splitText.concat(textArray)
      }
    }
  }
  return textArray
}

export {
  calculateGridParameters,
  smartSplitByNChars,
  splitUpText
}