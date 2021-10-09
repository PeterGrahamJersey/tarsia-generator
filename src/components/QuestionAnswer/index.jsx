import React, {useState} from 'react'
import './QuestionAnswer.css'
import {appConfig} from '../../data/config'

const Input = ({name, loadedValue, questionNumber, onChange, ...props}) => {
  const [value, setValue] = useState(loadedValue ? loadedValue : '');

  const handleInputChange = (event) => {
    setValue(event.target.value);
    onChange({name:name, questionNumber:questionNumber, value:event.target.value});
  }

  return (
    <input
      name={name}
      value={value}
      key={`${name}${questionNumber}`}        
      type="text"
      onChange={(event) => handleInputChange(event)}
      maxLength={appConfig.questions.maxLength}
      {...props} />
  )
}

const QuestionAnswer = ({questionNumber, onChange, loadedQuestion, loadedAnswer}) => { 

  return (
    <label>
      <div className='qa-label-text'>{questionNumber}</div>
      <Input name='q' className='qa-input-question qa-input' loadedValue={loadedQuestion} questionNumber={questionNumber} onChange={onChange} />
      <Input name='a' className='qa-input' loadedValue={loadedAnswer} questionNumber={questionNumber} onChange={onChange} />
    </label>
  );
}

const Questions = ({onChange, nQuestions, loadedQuestions, loadedAnswers}) => {
  const questions = []
  var question;
  for (question=1; question<=appConfig.questions.maxQuestions; question++) {
    var loadedQuestion = loadedQuestions[question] || ''
    var loadedAnswer = loadedAnswers[question] || ''
    let display = question <= nQuestions ? 'block' : 'none'
    questions.push(
      <div key={`qa${question}-div`} style={{display:display}}>
        <QuestionAnswer key={`qa${question}`} questionNumber={question} onChange={(data) => onChange(data)} loadedQuestion={loadedQuestion} loadedAnswer={loadedAnswer}/>
      </div>
      )
  }

  return(
    <form>
      {questions}
    </form>
  )
}

export default Questions