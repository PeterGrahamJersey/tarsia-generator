import React, {useState} from 'react';
import jsPDF from "jspdf";
import 'svg2pdf.js';
import './App.css';
import TarsiaGrid from '../TarsiaGrid';
import Questions from '../QuestionAnswer'
import hexGrid from '../../data/grids/hexGrid';
import PrintableSvgDiv from '../PrintableSvgDiv'

const App = (id) => {
  const [questions, setQuestions] = useState({})
  const [answers, setAnswers] = useState({})
  const [grid, setGrid] = useState(hexGrid)

  const calculateGridParameters = (grid) => {
    console.log(grid)
    const rows = grid.map(grid => grid.row)
    const cols = grid.map(grid => grid.col)
    const values = grid.map(grid => grid.values).flat(1).map(value => value ? parseInt(value.slice(0, -1)) : null) // flatten value arrays into single array, and extract the question number
    const width = (Math.max(...cols) - Math.min(...cols)) * 0.5 + 1 // triangles of same orientation
    const height = (Math.max(...rows) - Math.min(...rows)) + 1 // triangles
    const nQuestions = Math.max(...values)
    return {
      nQuestions:nQuestions,
      width:width,
      height:height
    }
  }
  let gridParams = calculateGridParameters(grid)

  const exportToPdf = () => {
    //Initialise pdf
    const pdf = new jsPDF({
      orientation: "landscape",
      unit:"mm"
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
          pdf.save("Tarsia Puzzle.pdf")
        } else {
          // else iterate
          pdf.addPage({orientation:"l", format:"a4"})
          addNextSvgToPdf(pdf, page, pages, parentDivId)
        }
      })
    }
    const parentDivId = "printSvgDiv"
    const pages = document.getElementById(parentDivId).children.length
    addNextSvgToPdf(pdf, 0, pages, "printSvgDiv")
  };
  
  const onInputChange = ({name, questionNumber, value}) => {
    if (name === 'q') {
        setQuestions((questions) => ({...questions, [questionNumber]:value}))
      } else if (name === 'a') {
        setAnswers((answers) => ({...answers, [questionNumber]:value}))
      }
  }

  return (
    <div className="App">
      <div className='container'>
        <div> 
            <p>{questions[0] && questions[0]}</p>
            <button onClick={exportToPdf}>Export to PDF</button>
            <Questions onChange={(data) => onInputChange(data)} nQuestions={gridParams.nQuestions}/>
        </div>
        <div id="hexGridSvgDiv">
          <svg viewBox="0 0 600 600" height="600" width="600">
            <TarsiaGrid id='tarsiaPreview' grid={grid} questions={questions} answers={answers}/>
          </svg>
        </div>
      </div>
      <div className="container hidden">
        <PrintableSvgDiv id="printSvgDiv" grid={grid} questions={questions} answers={answers}/>
      </div>
    </div>
  );
}

export default App;
