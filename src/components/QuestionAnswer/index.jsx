import React, { useState } from 'react'
import { Input, Label, Box, Flex} from 'theme-ui'
import { appConfig } from '../../data/config'
import { splitUpText } from '../../utils/grid'

const ManagedInput = ({name, loadedValue, questionNumber, onChange, ...props}) => {
  const [value, setValue] = useState(loadedValue ? loadedValue : '');
  const handleInputChange = (event) => {
    setValue(event.target.value);
    onChange({name:name, questionNumber:questionNumber, value:splitUpText(event.target.value, appConfig.triangle.text)});
  }
  return (
    <Input
      name={name}
      value={value}
      key={`${name}${questionNumber}`}
      id={`${name}${questionNumber}`}        
      type="text"
      onChange={(event) => handleInputChange(event)}
      maxLength={appConfig.questions.maxLength}
      {...props} />
  )
}

const QuestionAnswer = ({questionNumber, onChange, loadedQuestion, loadedAnswer}) => { 
  return (
    <Box>
      <Label>{questionNumber}</Label>
      <Flex>
        <ManagedInput mr={2} name='q' loadedValue={loadedQuestion} questionNumber={questionNumber} onChange={onChange} />
        <ManagedInput name='a' loadedValue={loadedAnswer} questionNumber={questionNumber} onChange={onChange} />
      </Flex>
    </Box>
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
      <Box my={2} key={`qa${question}-div`} sx={{display:display}}>
        <QuestionAnswer key={`qa${question}`} questionNumber={question} onChange={(data) => onChange(data)} loadedQuestion={loadedQuestion} loadedAnswer={loadedAnswer}/>
      </Box>
      )
  }
  return(
    <form>
      {questions}
    </form>
  )
}

export default Questions