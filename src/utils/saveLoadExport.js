import jsPDF from 'jspdf';
import LZString from 'lz-string'
import 'svg2pdf.js';
import '../data/Roboto-Regular-normal.js';

// Save to string
const generateSaveCode = (questions, answers, grid) => {
  // Prep Output
  // Save version 1 - pre-support for splitting up lines, questions and answers were strings
  // Save cersion 2 - after support for splitting up lines, questions and answers are now arrays
  var output = {questions, answers, grid, saveVersion:2}
  var outputString = JSON.stringify(output)
  var compressedOutputString = LZString.compressToBase64(outputString)
  return compressedOutputString
};


// Load from string
const convertTextArrayToInputString = (array) => {
  // Questions/answers are saved as arrays, this handles converting them back to strings for loading into
  // the input fields.
  var inputString = array.map(str => {
    if (str) { 
      // If the element ends in a '-' then remove the '-' and don't add a space
      if (str.substring(str.length -1) === '-'){ // hardcoding the assumption that grid.smartSplitByNChars adds a '-'
        str = str.substring(0, str.length - 1)
      } else { // Otherwise just use a space
        str = str.concat(' ')
      }
    }
    return str
  })
  return inputString.join('')
}
const objectValueStringsToArrays = (object) => {
  // Converts each key's value within an object to an array
  Object.keys(object).forEach((key) => { object[key] = [object[key]]})
}
const parseSaveCode = (text) => {
  if (text) { 
    var strippedText = text.split(' ').join('') // removing spaces that copying from a pdf introduces
    var parsedText = JSON.parse(LZString.decompressFromBase64(strippedText))
    var promptQ = parsedText['questions']
    var promptA = parsedText['answers']
    var promptGrid = parsedText['grid']
    if (parsedText['saveVersion'] === 1) { // pre-support for splitting up lines, questions and answers were strings
      objectValueStringsToArrays(promptQ)
      objectValueStringsToArrays(promptA)
    }
    return {promptQ, promptA, promptGrid}
  }
};

// Export to PDF
const generateAndSavePdf = (saveCode, previewSvg, printSvgs, pdfConfig) => {
  //Initialise pdf
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit:'mm'
  });
  pdf.setFont('Roboto-Regular', 'normal');
  const addSaveCodeToPdf = (pdf, saveCode, pdfConfig) => {
    pdf.addPage({orientation:'l', format:'a4'})
    pdf.text(
      'To edit your tarsia, go to www.tarsiamaker.co.uk, click load and paste this code:',
      pdfConfig.printMargin, //x
      pdfConfig.printMargin + 5  //y
    )
    pdf.setFontSize(8)
    const formattedSaveCode = pdf.splitTextToSize(saveCode, pdfConfig.width-pdfConfig.printMargin*2)
    pdf.text(
      formattedSaveCode,
      pdfConfig.printMargin, //x
      pdfConfig.printMargin + 15  //y
    )
  }
  const addNextSvgToPdf = (pdf, page, pages, svgsToExport, textToExport, saveCode, pdfConfig) => {
    // Recursive, adds an svg, waits for it to finish, then adds the next one until saving
    // Get svg
    let svgToExport = svgsToExport[page]
    let text = textToExport[page]
    // Add to pdf
    pdf.text(text, pdfConfig.printMargin, pdfConfig.printMargin+5)
    pdf.svg(svgToExport,{x:5,y:5,width:287,height:200}).then(() => {
      page = page+1
      if (page !== pages) {
        // iterate
        pdf.addPage({orientation:'l', format:'a4'})
        addNextSvgToPdf(pdf, page, pages, svgsToExport, textToExport, saveCode, pdfConfig)
      } else {
        addSaveCodeToPdf(pdf, saveCode, pdfConfig)
        pdf.save('tarsia.pdf')
      }
    })
  }

  var svgsToExport = []
  var textToExport = []
  svgsToExport.push(previewSvg)
  textToExport.push('Solution:')
  for (const printSvg of printSvgs) {
    svgsToExport.push(printSvg)
    textToExport.push('Print and cut out:')
  }
  const svgPages = svgsToExport.length
  addNextSvgToPdf(pdf, 0, svgPages, svgsToExport, textToExport, saveCode, pdfConfig)
};

export {
  generateSaveCode, 
  parseSaveCode, 
  generateAndSavePdf,
  convertTextArrayToInputString
};