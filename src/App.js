import React from 'react';
import jsPDF from "jspdf";
import 'svg2pdf.js';
import html2canvas from 'html2canvas';
//import QuestionAnswer from './QuestionAnswer.js'
//import logo from './logo.svg';
import './App.css';
import TarsiaGrid from './cTarsiaGrid';
import Questions from './cQuestionAnswer'
import hexGrid from './config';
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

    const addNextSvgToPdf = (pdf, page, pages, parentDivId) => {
      // Recursive, adds an svg, waits for it to finish, then adds the next one until saving
      // Get svg
      let svgToExport = document.getElementById(document.getElementById(parentDivId).children[page].id)
      // Add to pdf
      pdf.svg(svgToExport,{x:5,y:5,width:287,height:200}).then(() => {
        page = page+1
        console.log('page:', page, 'pages:', pages)
        if (page === pages) {
          console.log("saving...")
          // if page = pages-1, then save and break
          pdf.save("Tarsia Puzzle.pdf")
        } else {
          // else iterate
          console.log("add page...")
          pdf.addPage({orientation:"l", format:"a4"})
          console.log("iterate...")
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
      <div>
        <div className="App container">
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
          <PrintSvgDiv id="printSvgDiv" values={this.state.values} grid={hexGrid}/>
      </div>
    );
  }
}

export default App;
