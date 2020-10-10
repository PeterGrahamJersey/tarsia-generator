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
        </header>
    </div>
    );
  }
}

export default App;
