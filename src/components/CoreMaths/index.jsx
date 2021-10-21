import {useState} from 'react';
import { Helmet } from 'react-helmet';
// import {appConfig} from '../../data/config';
// import DOMPurify from 'dompurify';

/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Container, Heading, Input } from 'theme-ui'

// Components
// import { MathJaxContext, MathJax } from 'better-react-mathjax'
// import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';
import Tex2SVG from 'react-hook-mathjax';
import Triangle from '../Triangle'
import { appConfig } from '../../data/config'
// import Questions from '../QuestionAnswer'
// import grids from '../../data/grids';
// import PrintableSvgDiv from '../PrintableSvgDiv'
// import PreviewSvg from '../PreviewSvgDiv';
// import gridIcons from '../../data/gridIcons'
// import GridIcon from '../GridIcon'
// import {ClearModal, LoadModal, SaveModal} from '../Modal'

// Functions
// import {generateSaveCode, parseSaveCode, generateAndSavePdf} from '../../utils/saveLoadExport'
// import {calculateGridParameters} from '../../utils/grid'

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

const CoreMaths = (id) => {
  const [maths, setMaths] = useState('')
  const [mathSvg, setMathSvg] = useState(<svg/>)

  const onSuccess = (html) => {
    // console.log('html')
    // console.log(html)  
    console.log('Child Svg:')
    var child = html.children[0] // accessing the child
    console.log(child)
    var s = new XMLSerializer(); // convert element / object to xml string
    var htmlString = s.serializeToString(child);
    console.log(htmlString)
    // Sanitising -- can't as it removes data elements of the svgs
    // However, html inputted appears to be interpreted as latex so might be ok
    // var cleanHtmlString = DOMPurify.sanitize(htmlString)
    // console.log(cleanHtmlString)
    // Updating State
    setMathSvg(htmlString)
    console.log('--stateUpdated--')
    console.log('--------')
  }

  return (
    <Container>
        <Helmet>
          <title>Tarsia Maker | Maths</title>
          {/* Meta Tags */}
          <meta property='title' content='Tarsia Maker | Maths' />
          <meta property='description' content='A simple, online editor for mathematical Tarsia puzzles.' />
          <meta property='og:title' content='Tarsia Maker |  Maths' />
          <meta property='og:url' content='https://www.tarsiamaker.co.uk/maths' />
          <meta property='og:description' content='A simple, online editor for mathematical Tarsia puzzles.' />
          <meta property='og:image' content='https://i.postimg.cc/MTnhLVH3/preview-image.png' />
        </Helmet>

        <form key='formy'>
          <ManagedMathsInput key='mathsInput1-overall' name='mathsInput1' onChange={(data) => setMaths(data)}/>
        </form>
        <Tex2SVG latex={maths} id='svgOutputContainer' onSuccess={(html) => {onSuccess(html)}} />
        
        {/* <svg>
          <g dangerouslySetInnerHTML={{'__html':mathSvg}}/>
          <polygon points={`25,0 50,50 0,50`}/>
        </svg> */}
        <Triangle row={1} col={1} values={[null, null, mathSvg]} config={appConfig.triangle} key={`${id}-1-1`} textOrSvg='svg'/>)
    </Container>
  );
}

export default CoreMaths;
