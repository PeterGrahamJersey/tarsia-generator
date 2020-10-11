import React from 'react'

class QuestionAnswer extends React.Component {
    constructor(props) {
      super(props);
      this.questionNumber = props.questionNumber;
      this.state = {
        Q: props.questionNumber + "q",
        A: props.questionNumber + "a"
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
          <label>
            {this.id}
            <input
              name="q"           
              type="text"
              value={this.state.q}
              onChange={this.handleInputChange} />
            <input
              name="a"            
              type="text"
              value={this.state.a}
              onChange={this.handleInputChange} />
          </label>
      );
    }
  }

export default QuestionAnswer