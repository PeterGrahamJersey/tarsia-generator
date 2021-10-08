import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import jsPDF from 'jspdf';
import 'svg2pdf.js';
import './App.css';

// Components
import Questions from '../QuestionAnswer'
import grids from '../../data/grids';
import PrintableSvgDiv from '../PrintableSvgDiv'
import calculateGridParameters from '../../utils/calculateGridParameters'
import PreviewSvg from '../PreviewSvgDiv';
import gridIcons from '../../data/gridIcons'
import GridIcon from '../GridIcon'
import {ClearModal, LoadModal, SaveModal} from '../Modal'
import appConfig from '../../data/config';

// Functions
import {generateSaveCode, parseSaveCode} from '../../utils/saveLoadExport.js'

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
    const addSaveCodeToPdf = (pdf, saveCode) => {
      const formattedSaveCode = pdf.splitTextToSize(saveCode, appConfig.pdf.width-appConfig.pdf.printMargin*2)
      pdf.addPage({orientation:'l', format:'a4'})
      pdf.text(
        'To edit your tarsia, go to www.tarsiamaker.co.uk, click load and paste this code:',
        appConfig.pdf.printMargin, //x
        appConfig.pdf.printMargin + 5  //y
      )
      pdf.text(
        formattedSaveCode,
        appConfig.pdf.printMargin, //x
        appConfig.pdf.printMargin + 15  //y
      )
    }
    const addNextSvgToPdf = (pdf, page, pages, svgsToExport, textToExport, saveCode) => {
      // Recursive, adds an svg, waits for it to finish, then adds the next one until saving
      // Get svg
      let svgToExport = svgsToExport[page]
      let text = textToExport[page]
      // Add to pdf
      pdf.text(text, appConfig.pdf.printMargin, appConfig.pdf.printMargin+5)
      pdf.svg(svgToExport,{x:5,y:5,width:287,height:200}).then(() => {
        page = page+1
        if (page !== pages) {
          // iterate
          pdf.addPage({orientation:'l', format:'a4'})
          addNextSvgToPdf(pdf, page, pages, svgsToExport, textToExport, saveCode)
        } else {
          addSaveCodeToPdf(pdf, saveCode)
          pdf.save('tarsia.pdf')
        }
      })
    }
    const saveCode = generateSaveCode(questions, answers, grid)
    const previewSvg = document.getElementById('previewSvg')
    const printSvgs = document.getElementById('printSvgDiv').children
    var svgsToExport = []
    var textToExport = []
    svgsToExport.push(previewSvg)
    textToExport.push('Solution:')
    for (const printSvg of printSvgs) {
      svgsToExport.push(printSvg)
      textToExport.push('Print and cut out:')
    }
    const svgPages = svgsToExport.length
    addNextSvgToPdf(pdf, 0, svgPages, svgsToExport, textToExport, saveCode)
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
        var {promptQ, promptA, promptGrid} = parseSaveCode(text) //TODO: must be a 1 line way to do this
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
        <meta property='description' content='A simple, online editor for Tarsia puzzles.' />
        <meta property='theme-color' content="#607d86" />
        <meta property='title' content='Tarsia Maker' />
        <meta property='og:title' content='Tarsia Maker' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://www.tarsiamaker.co.uk/' />
        <meta property='og:description' content='A simple, online editor for Tarsia puzzles.' />
        <meta property='og:image' content='https://i.postimg.cc/MTnhLVH3/preview-image.png' />
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
          <li>A more comprehensive editor is available online (not created or supported by me), links to it and ideas on how to use Tarsia Puzzles are available from <a href='http://mrbartonmaths.com/teachers/rich-tasks/tarsia-jigsaw.html'>Mr Barton Maths</a>.</li>
          <li><a href='https://github.com/PeterGrahamJersey/tarsia-generator'>Source code</a></li>
        </ul>
      </div>
      <SaveModal handleClose={hideModals} show={showSaveModal} saveString={saveString}/>
      <LoadModal key={`loadModal-${loadCount}`} handleClose={hideModals} show={showLoadModal} loadFromText={loadFromText}></LoadModal>
      <ClearModal handleClose={hideModals} show={showClearModal} clearInputs={clearInputs}></ClearModal>
      <div className='hidden'>
        <PrintableSvgDiv id='printSvgDiv' grid={grid} questions={questions} answers={answers}/>
      </div>
    </div>
  );
}

export default App;
