import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import {appConfig} from '../../data/config';
import DOMPurify from 'dompurify';

/** @jsx jsx */
import { ThemeProvider, jsx } from 'theme-ui'
import { Button, Flex,  Container, Heading, Paragraph, Input } from 'theme-ui'
import { theme } from '../../data/theme'

// Components
// import { MathJaxContext, MathJax } from 'better-react-mathjax'
// import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';
import Tex2SVG from "react-hook-mathjax";
import Questions from '../QuestionAnswer'
import grids from '../../data/grids';
import PrintableSvgDiv from '../PrintableSvgDiv'
import PreviewSvg from '../PreviewSvgDiv';
import gridIcons from '../../data/gridIcons'
import GridIcon from '../GridIcon'
import {ClearModal, LoadModal, SaveModal} from '../Modal'

// Functions
import reactElementToJSXString from 'react-element-to-jsx-string';
import {generateSaveCode, parseSaveCode, generateAndSavePdf} from '../../utils/saveLoadExport'
import {calculateGridParameters} from '../../utils/grid'

const ManagedMathsInput = ({name, onChange, ...props}) => {
  const [value, setValue] = useState('');
  const handleInputChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  }
  return (
    <Input
      name={name}
      id={name}
      key={name}
      value={value}
      type="text"
      onChange={(event) => handleInputChange(event)}
      {...props} />
  )
}

const Wrapper = ({svg}) => {
  return (
    svg
  )
}

const CoreMaths = (id) => {
  const [maths, setMaths] = useState('')
  const [mathSvg, setMathSvg] = useState(<svg/>)

  const onSuccess = (html) => {
    // console.log('html')
    // console.log(html)  
    console.log('Child Svg:')
    var child = html.children[0] // accessing the child
    console.log(child)
    // Converting to a nice html string
    console.log('React element to JSZ string:')
    // var htmlString = reactElementToJSXString(child)
    var s = new XMLSerializer(); // convert element / object to xml string
    var htmlString = s.serializeToString(child);
    console.log(htmlString)
    // Sanitising
    var cleanHtmlString = DOMPurify.sanitize(htmlString)
    console.log(cleanHtmlString)
    // Updating State
    setMathSvg(htmlString)
    console.log('--stateUpdated--')
    console.log('--------')
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <MathJaxContext {...mathJaxConfig}> */}
        <Helmet>
          <title>Tarsia Maker | Maths</title>
          {/* Meta Tags */}
          <meta property='description' content='A simple, online editor for Tarsia puzzles.' />
          <meta property='theme-color' content="#607d86" />
          <meta property='title' content='Tarsia Maker | Maths' />
          <meta property='og:title' content='Tarsia Maker |  Maths' />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://www.tarsiamaker.co.uk/maths' />
          <meta property='og:description' content='A simple, online editor for mathematical Tarsia puzzles.' />
          <meta property='og:image' content='https://i.postimg.cc/MTnhLVH3/preview-image.png' />
        </Helmet>

        <Container variant='header'>
          <Heading>Tarsia Maker | <Tex2SVG display='inline' latex={'\\text{Maths}'}/></Heading>
        </Container>
        <form key='formy'>
          <ManagedMathsInput key='mathsInput1-overall' name='mathsInput1' onChange={(data) => setMaths(data)}/>
        </form>
        <Tex2SVG latex={maths} id='svgOutputContainer' onSuccess={(html) => {onSuccess(html)}} />
        <div dangerouslySetInnerHTML={{'__html':mathSvg}}/>
        <svg>
          <polygon points={`25,0 50,50 0,50`}/>
        </svg>
    </ThemeProvider>
  );
}

export default CoreMaths;
