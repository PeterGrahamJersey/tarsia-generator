const appConfig = {
  triangle: {
    side: 150, // px
    style: {
      fill: "white",
      stroke: "black",
      strokeWidth: 2,
    },
    text: {
      paddingY: 5,
      style: {
        fill: "black",
        //fontSize: "12pt",
      }
    }
  },
  pdf: {
    pageUnits: "mm",
    a4Width: 297, // mm
    a4Height: 210, //mm
    a4PrintMargin: 7, //mm each side
  }
};

// height of an equilateral triangle = sqrt(3)/2 * side
appConfig.triangle.height = Math.sqrt(3)/2 * appConfig.triangle.side; 

appConfig.a4Ratio = appConfig.pdf.a4Width/appConfig.pdf.a4Height;

export default appConfig;