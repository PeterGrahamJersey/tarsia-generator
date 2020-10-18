const appConfig = {}
appConfig['side'] = 150 // px
appConfig['height'] = Math.sqrt(3)/2 * appConfig.side // height of an equilateral triangle = sqrt(3)/2 * side
appConfig['pageUnits'] = "mm"
appConfig['a4width'] = 297 // mm
appConfig['a4height'] = 210 //mm
appConfig['a4printmargin'] = 7 //mm each side
appConfig['a4ratio'] = appConfig.a4width/appConfig.a4height
appConfig['triangleYTextPadding'] = 5

// Style for Svg Elements
// css didn't export to pdf very well
appConfig['styleTarsiaTriangle'] = {
  fill: "white",
  stroke: "black",
  strokeWidth: 2,
}
appConfig['styleTarsiaText'] = {
  fill: "black",
  //fontSize: "12pt",
}

export default appConfig