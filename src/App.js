import React from 'react';
//import QuestionAnswer from './QuestionAnswer.js'
//import logo from './logo.svg';
import './App.css';

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
    //const hex_r = 1;
    //const hex_s = 1;
    //const hex_h = Math.sqrt(Math.hex_s^2 - hex_r^2);

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
          <svg height="360" width="360">
            <polygon 
              points="90,0 270,0 360,180 270,360 90,360 0,180" 
              style={{
                fill:"lime",
                stroke:"purple",
                strokeWidth:1}} 
            />
            <text x="90" y="15" fill="red" textLength="180">{this.state.Q1}</text>
          </svg>
        </header>
    </div>
    );
  }
}

export default App;
