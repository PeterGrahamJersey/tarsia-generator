const appConfig = {
  triangle: {
    side: 150, // px 
    style: { // css classes didn't export to pdf, so using style
      fill: "white",
      stroke: "black",
      strokeWidth: 2,
    },
    text: {
      yAdjust: 5, // px
      style: { // css classes didn't export to pdf, so using style
        fill: "black"
        //fontSize: "12pt",
      }
    }

  },
  pdf: {
    units: 'mm',
    width: 297, // a4 landscape
    height: 210, // a4 landscape
    printMargin: 7,
  }
}

appConfig.triangle.height = Math.sqrt(3)/2 * appConfig.triangle.side // height of an equilateral triangle = sqrt(3)/2 * side
appConfig.pdf.orientation = appConfig.pdf.width > appConfig.pdf.height ? "landscape" : "portrait"
appConfig.pdf.ratio = appConfig.pdf.width / appConfig.pdf.height

export default appConfig