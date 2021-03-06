const appConfig = {
  triangle: {
    side: 250, // px 
    style: { // css classes didn't export to pdf, so using style
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2,
    },
    text: {
      paddingY: 8, // px
      style: { // css classes didn't export to pdf, so using style
        fill: 'black',
        fontSize: 15, // px? pdf doesn't like 
        fontFamily: 'helvetica'
      }
    }
  },
  pdf: {
    units: 'mm',
    width: 297, // a4 landscape
    height: 210, // a4 landscape
    printMargin: 7,
  },
  icons: {
    width:50 // 50px
  },
  questions: {
    maxQuestions:30,
    maxLength:25
  }
}

appConfig.triangle.height = Math.sqrt(3)/2 * appConfig.triangle.side // height of an equilateral triangle = sqrt(3)/2 * side
appConfig.pdf.orientation = appConfig.pdf.width > appConfig.pdf.height ? 'landscape' : 'portrait'
appConfig.pdf.ratio = appConfig.pdf.width / appConfig.pdf.height
appConfig.icons.height = Math.sqrt(3)/2 * appConfig.icons.width

export default appConfig