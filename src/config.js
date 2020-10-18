const appConfig = {
  side: 150, // px
  pageUnits: "mm",
  a4width: 297, // mm
  a4height: 210, //mm
  a4printmargin: 7, //mm each side
  triangleYTextPadding: 5,

  // Style for Svg Elements
  // css didn't export to pdf very well
  styleTarsiaTriangle: {
    fill: "white",
    stroke: "black",
    strokeWidth: 2,
  },

  styleTarsiaText: {
    fill: "black",
    //fontSize: "12pt",
  }
};

// height of an equilateral triangle = sqrt(3)/2 * side
appConfig.height = Math.sqrt(3)/2 * appConfig.side; 

appConfig.a4ratio = appConfig.a4width/appConfig.a4height;

export default appConfig;