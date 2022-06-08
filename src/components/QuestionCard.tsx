import React from 'react'
import {AnswerObject} from '../App'
import {Wrapper, ButtonWrapper} from './QuestionCard.styles'

// import {Wrapper, ButtonWrapper} from './QuestionCard.styles';
//we designat the prop types we are going to pass into QuestionCard component
type Props = {
    question: string;
    answers: string[];
    // callback is a type event that returns nothing
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}
//React.FC states this is a functional component that takes a generic <props>
//destructure props.
const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions}) => {
  return (
    <Wrapper>
      <p className='number'>
        QuestionCard: {questionNumber} / {totalQuestions}
      </p>
      {/* we need html */}
      <p dangerouslySetInnerHTML={{__html:question}}/>
        <div>
          {/* map through all the answers and create a button with the answer on it. When we click the button the value passed is the answer */}
          {/* the value passed into the callback function checkAnswer is the answer */}
          {answers.map((answer, index) => (
            // we need to pass props into ButtonWrapper because the styled component requires props to change the background
            //optional chaining lets you check if the key of an object exists, if not it returns undefined
            <ButtonWrapper correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer===answer} key={index}>
              {/* callback is type any because it's a function */}
              {/* disabled determined by if userAnswer is present */}
              {/* the value of each button is the answer */}
              <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{__html: answer}}/>
              </button>
            </ButtonWrapper>
          ))}
        </div>
    </Wrapper>
  )
}

export default QuestionCard