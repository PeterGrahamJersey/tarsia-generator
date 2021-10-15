import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import {appConfig} from '../../data/config';

import { Button, Flex,  Container} from 'theme-ui'

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

const Core = (id) => {
  const [loadedQuestions, setLoadedQuestions] = useState({
    '1': ['Write','your questions here...'],
    '2': ['The small shapes', 'above the diagram...']
  })
  const [loadedAnswers, setLoadedAnswers] = useState({
    '1': ['and your answers', 'here! Or vice versa.'],
    '2': ['change the puzzle shape.']
  })
  const [questions, setQuestions] = useState(loadedQuestions)
  const [answers, setAnswers] = useState(loadedAnswers)
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
    <Container>
      <Helmet>
        <title>Tarsia Maker</title>
        {/* Meta Tags */}
        <meta property='description' content='A simple, online editor for Tarsia puzzles.' />
        <meta property='title' content='Tarsia Maker' />
        <meta property='og:title' content='Tarsia Maker' />
        <meta property='og:url' content='https://www.tarsiamaker.co.uk/' />
        <meta property='og:description' content='A simple, online editor for Tarsia puzzles.' />
      </Helmet>

      <Container variant='body'>
        <Flex variant='layout.menu'>
          <GridIcon ariaLabel='Small triangle grid' icon={gridIcons.smallTriangleGrid} onClick={() => setGrid(grids.smallTriangleGrid)}/>
          <GridIcon ariaLabel='Small hexagon grid' icon={gridIcons.smallHexGrid} onClick={() => setGrid(grids.smallHexGrid)}/>
          <GridIcon ariaLabel='Large triangle grid' icon={gridIcons.triangleGrid} onClick={() => setGrid(grids.triangleGrid)}/>
          <GridIcon ariaLabel='Large hexagon grid' icon={gridIcons.hexGrid} onClick={() => setGrid(grids.hexGrid)}/>  
        </Flex>
        <Container variant='previewSvg'>
          <PreviewSvg id='tarsiaPreview' grid={grid} gridParams={gridParams} questions={questions} answers={answers}/>
        </Container>
        <Flex variant='layout.menu'>
          <Button onClick={exportToPdf}>Export to PDF</Button>
          <Button onClick={saveToText}>Save</Button>
          <Button onClick={loadModalShow}>Load</Button>
          <Button onClick={clearModalShow}>Clear</Button>
        </Flex>
        <Questions onChange={(data) => onInputChange(data)} nQuestions={gridParams.nQuestions} loadedQuestions={loadedQuestions} loadedAnswers={loadedAnswers} key={`questions-${loadCount}`}/>
      </Container>

      <SaveModal handleClose={hideModals} show={showSaveModal} saveString={saveString}/>
      <LoadModal key={`loadModal-${loadCount}`} handleClose={hideModals} show={showLoadModal} loadFromText={loadFromText}></LoadModal>
      <ClearModal handleClose={hideModals} show={showClearModal} clearInputs={clearInputs}></ClearModal>
      
      <Container variant='hidden'>
        <PrintableSvgDiv id='printSvgDiv' grid={grid} questions={questions} answers={answers}/>
      </Container>
    </Container>
  );
}

export default Core;
