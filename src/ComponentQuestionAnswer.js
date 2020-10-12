import React from 'react'

class QuestionAnswer extends React.Component {
    constructor(props) {
      super(props);
      this.questionNumber = props.questionNumber;
      this.onChange = props.onChange
      this.state = {
        q: "q" + props.questionNumber,
        a: "a" + props.questionNumber
      };

      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) { 
      // controlled component method for ensuring the input value and state remain in sync
      // to do with the differences between react and HTML implementation of inputs
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState(
        {
          [name]: value
        },
        // callback, fires after the state update to pass things back to the parent component
        () => { 
          if (this.props.onChange) { 
            this.props.onChange({state: this.state, questionNumber: this.questionNumber});
          }
        }
      )
    }

    render() {
      return (
          <label>
            {this.questionNumber}
            <input
              key={"q"+this.questionNumber}
              name="q"           
              type="text"
              value={this.state.q}
              onChange={this.handleInputChange} />
            <input
              key={"a"+this.questionNumber}
              name="a"            
              type="text"
              value={this.state.a}
              onChange={this.handleInputChange} />
          </label>
      );
    }
  }

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.nQustions = props.nQuestions;
    this.onInputChange = props.onInputChange;
  }

  render() {
    const questions = []
    var i;
    for (i=1; i<=30; i++) {
      questions.push(<QuestionAnswer key={"qa"+i} questionNumber={i} onChange={(data) => this.onInputChange(data)} />)
      questions.push(<br key={"qabr"+i}/>)
    }

    return(
      <form>
        {questions}
      </form>
    )
  }
}

export default Questions