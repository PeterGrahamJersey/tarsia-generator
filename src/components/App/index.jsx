import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import jsPDF from 'jspdf';
import 'svg2pdf.js';
import LZString from 'lz-string'
import './App.css';
import Questions from '../QuestionAnswer'
import grids from '../../data/grids';
import PrintableSvgDiv from '../PrintableSvgDiv'
import calculateGridParameters from '../../utils/calculateGridParameters'
import PreviewSvg from '../PreviewSvgDiv';
import gridIcons from '../../data/gridIcons'
import GridIcon from '../GridIcon'
import {ClearModal, LoadModal, SaveModal} from '../Modal'
import favicon from '../../data/favicon.svg'

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
    //Initialise pdf
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit:'mm'
    });
    const addNextSvgToPdf = (pdf, page, pages, parentDivId) => {
      // Recursive, adds an svg, waits for it to finish, then adds the next one until saving
      // Get svg
      let svgToExport = document.getElementById(document.getElementById(parentDivId).children[page].id)
      // Add to pdf
      pdf.svg(svgToExport,{x:5,y:5,width:287,height:200}).then(() => {
        page = page+1
        if (page === pages) {
          // if done then save
          pdf.save('Tarsia Puzzle.pdf')
        } else {
          // else iterate
          pdf.addPage({orientation:'l', format:'a4'})
          addNextSvgToPdf(pdf, page, pages, parentDivId)
        }
      })
    }
    const parentDivId = 'printSvgDiv'
    const pages = document.getElementById(parentDivId).children.length
    addNextSvgToPdf(pdf, 0, pages, 'printSvgDiv')
  };

  const saveToText = () => {
    // Prep Output
    var output = {questions, answers, grid, saveVersion:1}
    var outputString = JSON.stringify(output)
    var compressedOutputString = LZString.compressToBase64(outputString)
    //Show output modal
    setSaveString(compressedOutputString)
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
      // Validate input
      try {
        var parsedText = JSON.parse(LZString.decompressFromBase64(text))
        var promptQ = parsedText['questions']
        var promptA = parsedText['answers']
        var promptGrid = parsedText['grid']
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
    <div className='App'>
      <Helmet>
        <title>Tarsia Maker</title>
        <meta name='description' content='Create and download your own Tarsia puzzles.' />
        <meta name='theme-color' content="#607d86" />
        <link rel="icon" type='image/svg+xml' href={favicon} />
      </Helmet>
      <div className='header'>
        <div className='title'>Tarsia Maker</div>
      </div>
      <div className='content'>
        <div className='gridSelect'>
          <GridIcon icon={gridIcons.smallTriangleGrid} onClick={() => setGrid(grids.smallTriangleGrid)}/>
          <GridIcon icon={gridIcons.smallHexGrid} onClick={() => setGrid(grids.smallHexGrid)}/>
          <GridIcon icon={gridIcons.triangleGrid} onClick={() => setGrid(grids.triangleGrid)}/>
          <GridIcon icon={gridIcons.hexGrid} onClick={() => setGrid(grids.hexGrid)}/>  
        </div>
        <div id='hexGridSvgDiv' className='previewContainer'>
          <PreviewSvg id='tarsiaPreview' grid={grid} gridParams={gridParams} questions={questions} answers={answers}/>
        </div>
        <div className='buttons'>
          <button className='buttonsButton' onClick={exportToPdf}>Export to PDF</button>
          <button className='buttonsButton' onClick={saveToText}>Save</button>
          <button className='buttonsButton' onClick={loadModalShow}>Load</button>
          <button className='buttonsButton' onClick={clearModalShow}>Clear</button>
        </div>
        <div className='questions'>
          <Questions onChange={(data) => onInputChange(data)} nQuestions={gridParams.nQuestions} loadedQuestions={loadedQuestions} loadedAnswers={loadedAnswers} key={`questions-${loadCount}`}/>
        </div>
      </div>
      <div className='footer'>
        <ul>
          <li>Feedback or ideas? Reach out to me on twitter at <a href='https://twitter.com/peter_graham_'>@peter_graham_</a>.</li>
          <li>A more comprehensive editor is available online (not created or supported by me), links to it and ideas on how to use Tarsia Puzzles are available from <a href='http://mrbartonmaths.com/teachers/rich-tasks/tarsia-jigsaw.html'>Mr Burton Maths</a>.</li>
          <li><a href='https://github.com/PeterGrahamJersey/tarsia-generator'>Source code</a></li>
        </ul>
      </div>
      <SaveModal handleClose={hideModals} show={showSaveModal} saveString={saveString}/>
      <LoadModal handleClose={hideModals} show={showLoadModal} loadFromText={loadFromText}></LoadModal>
      <ClearModal handleClose={hideModals} show={showClearModal} clearInputs={clearInputs}></ClearModal>
      <div className='hidden'>
        <PrintableSvgDiv id='printSvgDiv' grid={grid} questions={questions} answers={answers}/>
      </div>
    </div>
  );
}

export default App;
