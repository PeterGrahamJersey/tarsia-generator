import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import {appConfig} from '../../data/config';

/** @jsx jsx */
import { ThemeProvider, jsx } from 'theme-ui'
import { Button, Flex,  Container, Heading, Paragraph, Input } from 'theme-ui'
import { theme } from '../../data/theme'

// Components
import { MathComponent } from 'mathjax-react'
import Questions from '../QuestionAnswer'
import grids from '../../data/grids';
import PrintableSvgDiv from '../PrintableSvgDiv'
import PreviewSvg from '../PreviewSvgDiv';
import gridIcons from '../../data/gridIcons'
import GridIcon from '../GridIcon'
import {ClearModal, LoadModal, SaveModal} from '../Modal'

// Functions
import {generateSaveCode, parseSaveCode, generateAndSavePdf} from '../../utils/saveLoadExport'
import {calculateGridParameters} from '../../utils/grid'

const ManagedMathsInput = ({name, onChange, ...props}) => {
  const [value, setValue] = useState('');
  const handleInputChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
    // MathJax.typeset()
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

const MathsSvg = ({tex}) => {
  const [reason, setReason] = useState('')
  
  const onError = (reason) => {
    // reflect the TeX compile error in the component state
    setReason(reason)
  }
  const onSuccess = () => {
    // clear the reason when we have no errors
    setReason('')
  }

  console.log(tex)
  return (
    <MathComponent tex={tex} onError={(err) => onError(err)} onSuccess={() => onSuccess()} />
  )
}

const CoreMaths = (id) => {
  const [maths, setMaths] = useState('')

  return (
    <ThemeProvider theme={theme}>
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
        {/* Scripts */}
        {/* <script type="text/javascript" src='./mathJaxConfig.js'></script> */}
        {/* <script type="text/javascript" src='./mathJaxConfig.js'>
        </script>
        <script type="text/javascript" id="MathJax-script" async
          src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js'>
        </script> */}
      </Helmet>

      <Container variant='header'>
        <Heading>Tarsia Maker | <MathsSvg tex='Maths'/></Heading>
      </Container>
      <form key='formy'>
        <ManagedMathsInput key='mathsInput1-overall' name='mathsInput1' onChange={(data) => setMaths(data)}/>
      </form>
      <MathsSvg tex={maths}/>

    </ThemeProvider>
  );
}

export default CoreMaths;
