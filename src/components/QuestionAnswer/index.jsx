import React, {useState} from 'react'
import appConfig from '../../data/config'

const Input = ({name, questionNumber, onChange, ...props}) => {
  const [value, setValue] = useState('');

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
      maxlength={appConfig.questions.maxLength}
      {...props} />
  )
}

const QuestionAnswer = ({questionNumber, onChange}) => { 

  return (
    <label>
      {questionNumber}
      <Input name='q' questionNumber={questionNumber} onChange={onChange} />
      <Input name='a' questionNumber={questionNumber} onChange={onChange} />
    </label>
  );
}

const Questions = ({onChange, nQuestions}) => {
  const questions = []
  var question;
  for (question=1; question<=appConfig.questions.maxQuestions; question++) {
    let display = question <= nQuestions ? 'block' : 'none'
    questions.push(
      <div key={`qa${question}-div`} style={{display:display}}>
        <QuestionAnswer key={`qa${question}`} questionNumber={question} onChange={(data) => onChange(data)} />
        <br key={`qa${question}-br`}/>
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