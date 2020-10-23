import React, {useState} from 'react';
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
    pdf.setFont('Helvetica')

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
      <div className='container'>
        <div>
          <GridIcon icon={gridIcons.hexGrid} onClick={() => setGrid(grids.hexGrid)}/>
          <GridIcon icon={gridIcons.triangleGrid} onClick={() => setGrid(grids.triangleGrid)}/>
          <GridIcon icon={gridIcons.smallHexGrid} onClick={() => setGrid(grids.smallHexGrid)}/>
          <GridIcon icon={gridIcons.smallTriangleGrid} onClick={() => setGrid(grids.smallTriangleGrid)}/>
        </div>
        <div> 
            <p>{questions[0] && questions[0]}</p>
            <button onClick={exportToPdf}>Export to PDF</button>
            <Questions onChange={(data) => onInputChange(data)} nQuestions={gridParams.nQuestions}/>
        </div>
        <div id='hexGridSvgDiv'>
          <PreviewSvg id='tarsiaPreview' grid={grid} gridParams={gridParams} questions={questions} answers={answers}/>
        </div>
      </div>
      <div className='container hidden'>
        <PrintableSvgDiv id='printSvgDiv' grid={grid} questions={questions} answers={answers}/>
      </div>
    </div>
  );
}

export default App;
