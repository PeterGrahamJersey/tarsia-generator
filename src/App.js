import React from 'react';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
//import QuestionAnswer from './QuestionAnswer.js'
//import logo from './logo.svg';
import './App.css';
import TarsiaGrid from './ComponentTarsiaGrid';
import Questions from './ComponentQuestionAnswer'
import hexGrid from './config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.state = {
      values: {}
    };

    this.eventhandler = this.eventhandler.bind(this);
  }

  exportToPdf() {
    //https://medium.com/@shivekkhurana/how-to-create-pdfs-from-react-components-client-side-solution-7f506d9dfa6d
    const svgToExport = document.getElementById('hexGridSvg') 
    html2canvas(svgToExport)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');    
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("download.pdf");  
      });
  }
  
  eventhandler(data) {
      const updatedValues = this.state.values
      updatedValues[data.questionNumber] = data.state
      this.setState({
        values: updatedValues
      })
  }

  render() {
    return (
      <div className="App container">
        <div> 
            <button onClick={this.exportToPdf}>Export to PDF</button>
            <Questions onInputChange={(data) => this.eventhandler(data)} nQuestions="30"/>
        </div>
        <div id="hexGridSvg">
          <svg viewBox="0 0 600 600" height="600" width="600">
            <TarsiaGrid config={hexGrid} values={this.state.values}/>
          </svg>
        </div>
    </div>
    );
  }
}

export default App;
