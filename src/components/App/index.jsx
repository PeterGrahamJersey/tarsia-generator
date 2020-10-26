import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import jsPDF from 'jspdf';
import 'svg2pdf.js';
import './App.css';
import Questions from '../QuestionAnswer'
import grids from '../../data/grids';
import PrintableSvgDiv from '../PrintableSvgDiv'
import calculateGridParameters from '../../utils/calculateGridParameters'
import PreviewSvg from '../PreviewSvgDiv';
import gridIcons from '../../data/gridIcons'
import GridIcon from '../GridIcon'
import favicon from '../../data/favicon.svg'

const App = (id) => {
  const [questions, setQuestions] = useState({})
  const [answers, setAnswers] = useState({})
  const [grid, setGrid] = useState(grids.triangleGrid)
  const gridParams = calculateGridParameters(grid) // not sure this is the best place for this calculation

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
      <div className='fixed-header'>
        <div className='title'>Tarsia Maker</div>
        <button onClick={exportToPdf}>Export to PDF</button>
      </div>
      <div className='content'>
        <div className='gridSelect'>
          <GridIcon icon={gridIcons.smallTriangleGrid} onClick={() => setGrid(grids.smallTriangleGrid)}/>
          <GridIcon icon={gridIcons.smallHexGrid} onClick={() => setGrid(grids.smallHexGrid)}/>
          <GridIcon icon={gridIcons.triangleGrid} onClick={() => setGrid(grids.triangleGrid)}/>
          <GridIcon icon={gridIcons.hexGrid} onClick={() => setGrid(grids.hexGrid)}/>  
        </div>
        <div className='questions'>
          <Questions onChange={(data) => onInputChange(data)} nQuestions={gridParams.nQuestions}/>
        </div>
        <div id='hexGridSvgDiv' className='preview'>
          <PreviewSvg id='tarsiaPreview' grid={grid} gridParams={gridParams} questions={questions} answers={answers}/>
        </div>
      </div>
      <div className='footer'>
        <ul>
          <li>Feedback or ideas? Reach out to me on twitter at <a href='https://twitter.com/peter_graham_'>@peter_graham_</a>.</li>
          <li>A more comprehensive editor is available online (not created or supported by me), links to it and ideas on how to use Tarsia Puzzles are available from <a href='http://mrbartonmaths.com/teachers/rich-tasks/tarsia-jigsaw.html'>Mr Burton Maths</a>.</li>
          <li><a href='https://github.com/PeterGrahamJersey/tarsia-generator'>Source code</a></li>
        </ul>
      </div>
      <div className='hidden'>
        <PrintableSvgDiv id='printSvgDiv' grid={grid} questions={questions} answers={answers}/>
      </div>
    </div>
  );
}

export default App;
