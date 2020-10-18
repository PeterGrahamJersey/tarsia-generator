import React from 'react';
import jsPDF from "jspdf";
import 'svg2pdf.js';
import './App.css';
import TarsiaGrid from './cTarsiaGrid';
import Questions from './cQuestionAnswer'
import hexGrid from './configGrids';
import PrintSvgDiv from './cPrintSvgDiv'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.state = {
      values: {}
    };

    this.eventhandler = this.eventhandler.bind(this);
    this.exportToPdf = this.exportToPdf.bind(this);
  }

  exportToPdf() {
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
  
  eventhandler(data) {
      const updatedValues = this.state.values
      updatedValues[data.questionNumber] = data.state
      this.setState({
        values: updatedValues
      })
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div> 
              <button onClick={this.exportToPdf}>Export to PDF</button>
              <Questions onInputChange={(data) => this.eventhandler(data)} nQuestions="30"/>
          </div>
          <div id="hexGridSvgDiv">
            <svg viewBox="0 0 600 600" height="600" width="600">
              <TarsiaGrid config={hexGrid} values={this.state.values}/>
            </svg>
          </div>
        </div>
        <div className="container hidden">
          <PrintSvgDiv id="printSvgDiv" values={this.state.values} grid={hexGrid}/>
        </div>
      </div>
    );
  }
}

export default App;
