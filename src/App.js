import React from 'react';
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
            <Questions onInputChange={(data) => this.eventhandler(data)} nQuestions="5"/>
        </div>
        <div>
          <svg height="600" width="600">
            <TarsiaGrid config={hexGrid} values={this.state.values}/>
          </svg>
        </div>
    </div>
    );
  }
}

export default App;
