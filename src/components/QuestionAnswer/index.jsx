import React, {useState} from 'react'
import appConfig from '../../data/config'
import './QuestionAnswer.css'

const Input = ({name, loadedValue, questionNumber, onChange, ...props}) => {
  const [value, setValue] = useState(loadedValue ? loadedValue : '');

  const smartSplitByNChars = (text, n) => {
    if (text && text.length>n) {
      try {
        const r = new RegExp('(^|\\s).{0,'+(n+1)+'}$');
        const matchedString = text.match(r)[0].trim()
        const remainingString = text.replace(r,'')
        return [remainingString, matchedString]
      } catch {
        // If the regex fails, resort to n characters
        const matchedString = text.substring(text.length - n);
        const remainingString = text.substring(0, text.length - n) + '-';
        return [remainingString, matchedString]
      }
    }
    return [text]
  }
  const splitUpText = (text) => {
    // if shorter than 1st line, don't split it up
    let textArray = [text]
    if (text && text.length > appConfig.triangle.text.style.lineLength[0]) {
      // Split with regexp
      var i;
      var splitText;
      for(i=0; i<appConfig.triangle.text.maxLines; i++) {
        let lineLength = appConfig.triangle.text.style.lineLength[i]
        let textToSplit = textArray.shift()
        if (textToSplit.length <= lineLength) {
          // if text length less than line length, no need to split it up
          splitText = [textToSplit]
          textArray = splitText.concat(textArray)
          return textArray
        } else {
          splitText = smartSplitByNChars(textToSplit, lineLength)
          textArray = splitText.concat(textArray)
        }
      }
    }
    return textArray
  }

  const handleInputChange = (event) => {
    setValue(event.target.value);
    //console.log(splitUpText(event.target.value));
    onChange({name:name, questionNumber:questionNumber, value:splitUpText(event.target.value)});
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