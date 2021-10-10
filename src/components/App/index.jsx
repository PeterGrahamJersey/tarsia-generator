import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import {appConfig} from '../../data/config';

/** @jsx jsx */
import { ThemeProvider, jsx } from 'theme-ui'
import { Button, Flex,  Container, Heading, Divider} from 'theme-ui'
import { theme } from '../../data/theme'

// Components
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

const App = (id) => {
  const [questions, setQuestions] = useState({})
  const [loadedQuestions, setLoadedQuestions] = useState({})
  const [answers, setAnswers] = useState({})
  const [loadedAnswers, setLoadedAnswers] = useState({})
  const [loadCount, setloadCount] = useState(0)
  const [grid, setGrid] = useState(grids.triangleGrid)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveString, setSaveString] = useState('')
  const [showLoadModal, setShowLoadModal] = useState(false)
  const [showClearModal, setShowClearModal] = useState(false) 
  const gridParams = calculateGridParameters(grid) // not sure this is the best place for this calculation

  const hideModals = () => {
    setShowSaveModal(false)
    setShowLoadModal(false)
    setShowClearModal(false)
  }
  const exportToPdf = () => {
    const saveCode = generateSaveCode(questions, answers, grid)
    const previewSvg = document.getElementById('previewSvg')
    const printSvgs = document.getElementById('printSvgDiv').children
    generateAndSavePdf(saveCode, previewSvg, printSvgs, appConfig.pdf)
  };
  const saveToText = () => {
    var saveCode = generateSaveCode(questions, answers, grid)
    //Show output modal
    setSaveString(saveCode)
    setShowSaveModal(true)
  }
  const loadModalShow = () => {
    setShowLoadModal(true)
  }
  const valuesForInputs = (questionValues, answerValues, gridValue) => {
    // Set states
    setGrid(gridValue)
    setLoadedQuestions(questionValues)
    setQuestions(questionValues)
    setLoadedAnswers(answerValues)
    setAnswers(answerValues)
    // Increment load count (to trigger re-render of Questions)
    setloadCount(loadCount+1)
  }
  const loadFromText = (text) => {
    if (text) { 
      try {
        var {promptQ, promptA, promptGrid} = parseSaveCode(text)
        valuesForInputs(promptQ, promptA, promptGrid)
      }
      catch {
        window.alert('Invalid tarsia code.')
      }
    }
  }
  const clearModalShow = () => {
    setShowClearModal(true)
  }
  const clearInputs = () => {
      valuesForInputs({}, {}, grid)
  }
  const onInputChange = ({name, questionNumber, value}) => {
    if (name === 'q') {
        setQuestions((questions) => ({...questions, [questionNumber]:value}))
      } else if (name === 'a') {
        setAnswers((answers) => ({...answers, [questionNumber]:value}))
      }
  }

  return (
    <ThemeProvider theme={theme}>
        <Helmet>
          <title>Tarsia Maker</title>
          <meta property='description' content='A simple, online editor for Tarsia puzzles.' />
          <meta property='theme-color' content="#607d86" />
          <meta property='title' content='Tarsia Maker' />
          <meta property='og:title' content='Tarsia Maker' />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://www.tarsiamaker.co.uk/' />
          <meta property='og:description' content='A simple, online editor for Tarsia puzzles.' />
          <meta property='og:image' content='https://i.postimg.cc/MTnhLVH3/preview-image.png' />
        </Helmet>
        
        <Container variant='header'>
          <Heading>Tarsia Maker</Heading>
        </Container>
        
        <Container variant='body'>
          <Flex variant='layout.menu' mt={2} mb={2}>
            <GridIcon ariaLabel='Small triangle grid' icon={gridIcons.smallTriangleGrid} onClick={() => setGrid(grids.smallTriangleGrid)}/>
            <GridIcon ariaLabel='Small hexagon grid' icon={gridIcons.smallHexGrid} onClick={() => setGrid(grids.smallHexGrid)}/>
            <GridIcon ariaLabel='Large triangle grid' icon={gridIcons.triangleGrid} onClick={() => setGrid(grids.triangleGrid)}/>
            <GridIcon ariaLabel='Large hexagon grid' icon={gridIcons.hexGrid} onClick={() => setGrid(grids.hexGrid)}/>  
          </Flex>
          <div id='hexGridSvgDiv' className='previewContainer'>
            <PreviewSvg id='tarsiaPreview' grid={grid} gridParams={gridParams} questions={questions} answers={answers}/>
          </div>
          <Flex variant='layout.menu'>
            <Button mr={2} onClick={exportToPdf}>Export to PDF</Button>
            <Button mr={2} onClick={saveToText}>Save</Button>
            <Button mr={2} onClick={loadModalShow}>Load</Button>
            <Button onClick={clearModalShow}>Clear</Button>
          </Flex>
          <div className='questions'>
            <Questions onChange={(data) => onInputChange(data)} nQuestions={gridParams.nQuestions} loadedQuestions={loadedQuestions} loadedAnswers={loadedAnswers} key={`questions-${loadCount}`}/>
          </div>

        </Container>

        <Container variant='footer'>
          <Container variant='body'>
            <ul>
              <li>Feedback or ideas? Reach out to me on twitter at <a href='https://twitter.com/peter_graham_'>@peter_graham_</a>.</li>
              <li>A more comprehensive editor is available online (not created or supported by me), links to it and ideas on how to use Tarsia Puzzles are available from <a href='http://mrbartonmaths.com/teachers/rich-tasks/tarsia-jigsaw.html'>Mr Barton Maths</a>.</li>
              <li><a href='https://github.com/PeterGrahamJersey/tarsia-generator'>Source code</a></li>
            </ul>
          </Container>
        </Container>

        <SaveModal handleClose={hideModals} show={showSaveModal} saveString={saveString}/>
        <LoadModal key={`loadModal-${loadCount}`} handleClose={hideModals} show={showLoadModal} loadFromText={loadFromText}></LoadModal>
        <ClearModal handleClose={hideModals} show={showClearModal} clearInputs={clearInputs}></ClearModal>
        
        <div className='hidden'>
          <PrintableSvgDiv id='printSvgDiv' grid={grid} questions={questions} answers={answers}/>
        </div>
    </ThemeProvider>
  );
}

export default App;
