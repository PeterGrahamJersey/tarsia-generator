import React, { useState } from 'react';
import jsPDF from "jspdf";
import 'svg2pdf.js';
import './App.css';
import TarsiaGrid from '../TarsiaGrid';
import Questions from '../QuestionAnswer'
import PrintableSVGDiv from '../PrintableSVGDiv'
import hexGrid from '../../data/hexGrid';

const App = () => {
  const [values, setValues] = useState({})

  const handleQuestionInput = ({ questionNumber, state }) => {
    const updatedValues = values
    updatedValues[questionNumber] = state
    setValues({
      ...values,
      [questionNumber]: state
    })
  }

  const addNextSvgToPdf = (pdf, page, pages, parentDivId) => {
    // Recursive, adds an svg, waits for it to finish, then adds the next one until saving
    // Get svg
    let svgToExport = document.getElementById(document.getElementById(parentDivId).children[page].id)
    // Add to pdf
    pdf.svg(svgToExport, { x: 5, y: 5, width: 287, height: 200 }).then(() => {
      page = page + 1
      console.log('page:', page, 'pages:', pages)
      if (page === pages) {
        console.log("saving...")
        // if page = pages-1, then save and break
        pdf.save("Tarsia Puzzle.pdf")
      } else {
        // else iterate
        console.log("add page...")
        pdf.addPage({ orientation: "l", format: "a4" })
        console.log("iterate...")
        addNextSvgToPdf(pdf, page, pages, parentDivId)
      }
    })
  }

  const exportToPdf = () => {
    //Initialise pdf
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm"
    });

    const parentDivId = "printSvgDiv"
    const pages = document.getElementById(parentDivId).children.length
    addNextSvgToPdf(pdf, 0, pages, "printSvgDiv")
  };

  return (
    <div className="App">
      <div className="container">
        <div>
          <button onClick={exportToPdf}>Export to PDF</button>
          <Questions onInputChange={(data) => handleQuestionInput(data)} nQuestions="30" />
        </div>
        <div id="hexGridSvgDiv">
          <svg viewBox="0 0 600 600" height="600" width="600">
            <TarsiaGrid grid={hexGrid} values={values} />
          </svg>
        </div>
      </div>
      <div className="container hidden">
        <PrintableSVGDiv id="PrintableSVGDiv" values={values} grid={hexGrid} />
      </div>
    </div>
  );
}

export default App;
