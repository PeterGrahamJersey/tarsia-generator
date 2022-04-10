/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

const mapKeys = (dict, mapping) => {
  // Assumes integer keys in the old dictionary
  // Creates a new dict with different integer keys
  let tempDict = {}
  if (dict) {
    for (const [key, value] of Object.entries(dict)) {
      tempDict[mapping[key-1]] = value
    }
  }
  return tempDict
}

const generateMapping = (maxIndex, shift=1) => {
  let mapping = Array.from({length: maxIndex}, (_, i) => i + shift)
  shuffleArray(mapping)
  return mapping
}

const getMaxIndex = (gridParams, questions, answers) => {
  let maxIndex = gridParams.nQuestions
  // max of current shape
  if (questions) {
    maxIndex = Math.max(maxIndex, Math.max(...(Object.keys(questions))))
  }
  if (answers) {
    maxIndex = Math.max(maxIndex, Math.max(...(Object.keys(answers))))
  }
  return maxIndex
}

export {
  shuffleArray,
  generateMapping,
  mapKeys,
  getMaxIndex
}