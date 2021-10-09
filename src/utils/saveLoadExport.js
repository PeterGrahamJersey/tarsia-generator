import jsPDF from 'jspdf';
import LZString from 'lz-string'
import 'svg2pdf.js';

// Save to string
const generateSaveCode = (questions, answers, grid) => {
  // Prep Output
  var output = {questions, answers, grid, saveVersion:1}
  var outputString = JSON.stringify(output)
  var compressedOutputString = LZString.compressToBase64(outputString)
  return compressedOutputString
};


// Load from string
const parseSaveCode = (text) => {
  if (text) { 
    var strippedText = text.split(' ').join('') // removing spaces that copying from a pdf introduces
    var parsedText = JSON.parse(LZString.decompressFromBase64(strippedText))
    var promptQ = parsedText['questions']
    var promptA = parsedText['answers']
    var promptGrid = parsedText['grid']
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
  const addSaveCodeToPdf = (pdf, saveCode, pdfConfig) => {
    const formattedSaveCode = pdf.splitTextToSize(saveCode, pdfConfig.width-pdfConfig.printMargin*2)
    pdf.addPage({orientation:'l', format:'a4'})
    pdf.text(
      'To edit your tarsia, go to www.tarsiamaker.co.uk, click load and paste this code:',
      pdfConfig.printMargin, //x
      pdfConfig.printMargin + 5  //y
    )
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
  generateAndSavePdf
};