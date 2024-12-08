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
        fontSize: 13  , // px? pdf doesn't like 
        fontFamily: 'Noto Sans',
        lineSpace: 0.1, // gap as number of lines 
        lineLength: [25, 18, 10, 5], // max line lengths
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
  }
}

appConfig.triangle.height = Math.sqrt(3)/2 * appConfig.triangle.side // height of an equilateral triangle = sqrt(3)/2 * side
appConfig.pdf.orientation = appConfig.pdf.width > appConfig.pdf.height ? 'landscape' : 'portrait'
appConfig.pdf.ratio = appConfig.pdf.width / appConfig.pdf.height
appConfig.icons.height = Math.sqrt(3)/2 * appConfig.icons.width

appConfig.triangle.text.maxLines = 3 // seemed easier to hard code //Math.floor(appConfig.triangle.height / (2*(appConfig.triangle.text.style.fontSize + appConfig.triangle.text.style.fontSize*appConfig.triangle.text.style.lineSpace)))
appConfig.questions.maxLength = appConfig.triangle.text.style.lineLength.slice(0, appConfig.triangle.text.maxLines).reduce((a,b) => (a+b))
appConfig.triangle.text.yHeightStep = appConfig.triangle.text.style.fontSize * (1 + appConfig.triangle.text.style.lineSpace)

export {appConfig}