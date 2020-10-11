import React from 'react';
//import QuestionAnswer from './QuestionAnswer.js'
//import logo from './logo.svg';
import './App.css';
import TarsiaGrid from './ComponentTarsiaGrid';
import hexGrid from './config';

function PairedText(row, n, side, rotation, value1, value2) {
  const h = Math.sqrt(3)*side/2
  const x = side + side/2
  const y = h/2
  const cor = x + "," + y
  return <>
      <text transform={"rotate("+rotation+" "+cor+")"} x={x} y={y} fill="red" textLength={side}>{value1}</text>
      <text transform={"rotate("+rotation+180+" "+cor+")"} x={x} y={y} fill="red" textLength={side}>{value2}</text>
    </>
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.state = {
      Q1: "question",
      A1: "answer"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form> 
            <label>
              {this.id}
              <input
                name="Q1"           
                type="text"
                value={this.state.Q1}
                onChange={this.handleInputChange} />
              <input
                name="A1"            
                type="text"
                value={this.state.A1}
                onChange={this.handleInputChange} />
            </label>
          </form>
          <p>Text output: {this.state.Q1}</p>
          <svg height="600" width="600">
            <TarsiaGrid config={hexGrid}/>
            {PairedText(1, 1, 100, 0, this.state.Q1, this.state.A1)}
          </svg>
        </header>
    </div>
    );
  }
}

export default App;
