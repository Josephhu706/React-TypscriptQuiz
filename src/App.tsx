import React, {useState} from 'react';
import { fetchQuizQuestions } from './API';
//components
import QuestionCard from './components/QuestionCard';
//Difficulty Types
import { QuestionState, Difficulty } from './API';
//sty;es
import {GlobalStyle, Wrapper} from './App.styles'

export type AnswerObject = {
  //this is the question
  question: string;
  //this is the user answer
  answer: string; 
  //this determines if the answer is correct or not
  correct: boolean;
  //this is the actual correct answer
  correctAnswer: string;
}

//total number of questions
const TOTAL_QUESTIONS = 10;


function App() {
  //create some state
  const [loading, setLoading] = useState(false) //if the game is loading
  const [questions, setQuestions] = useState<QuestionState[]>([])//this will be an array containing objects of Type QuestionState
  const [number, setNumber] = useState(0) //the state of the question number
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]) //The state of the users answer is an array of AnswerObject
  const [score, setScore] = useState(0) //state of score
  const [gameOver, setGameOver] = useState(true)//state of if the game is over

  //feed into the function the TOTAL_QUESTIONS number and the difficulty from the enum in API.ts


  //fetch the question Data
  const startTrivia = async () => {
    //when we fetch the api, it will take time so we set Loading to true
    setLoading(true);
    //when we start the game, the game is not over
    setGameOver(false);
    //we create newQuestions at the start of the game where we fetch 10 questions on difficulty easy
    try{
      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
      setQuestions(newQuestions)
    }
    catch(error){
      console.log(error)
    }
    //reset the board
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  //this function takes the event object, which is a react mouse event, specifically a HTML button
  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) =>{
    console.log('answer checked')
    //if the game isn't over
    if(!gameOver){
      //get the users answer
      const answer = event.currentTarget.value;
      //When we click an answer, we pass the question number to the questions array and if the correct answer from the typeQuestion object matches the answer
      const correct = questions[number].correct_answer === answer;
      //Add score if answer is correct increment the score
      if (correct) {
        let newScore = score
        setScore(newScore += 1)
      }
      //save the answer in the AnswerObject
      //first we create new Object where the question is the current question
      //the correct answer is the correct answer of the current question
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      //copy the previous state of userAnswers and add the new answerObject
      setUserAnswers(prev => [...prev, answerObject])
    }
    console.log(userAnswers)
  }

  const nextQuestion = () =>{
    const nextQuestion = number + 1;
    //if on the last question end the game
    if (nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)
    } else{
      //increment the next question number
      setNumber(nextQuestion)
    }
  }

  return (
    <>
    <GlobalStyle/>
      <Wrapper className="App">
        <h1>WHAD'YA KNOW?</h1>
        {/* if the game is over or the user has answered 10 questions, end the game */}
        {(gameOver || (userAnswers.length === TOTAL_QUESTIONS)) && 
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        }

        {/* only show the score if we're not in game over */}
        {!gameOver && <p className='score'>Score:{score}</p>}

        {/* only show loading when loading is true. */}
        {loading && <p>Loading Questions ...</p>}

        {/* we start question number at number+1 because it starts at index 0 */}
        {/* we are passing into QuestionCard all the props it expects in type Props */}
        {/* Only show QuestionCard if we're not loading and the game is not over */}
        {(!loading && !gameOver) && (<QuestionCard questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        // if the userAnswers exists we pass in the userAnswers and specific number of the userAnswer else undefined
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        //callback calls the checkAnswer function 
        callback={checkAnswer}/>)}
        {/* if the game is not over and not loading and the user has answered 1 question and we're not on the last question */}
        {(!gameOver && !loading && (userAnswers.length === number + 1) && (number !== TOTAL_QUESTIONS - 1)) && 
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        }

      </Wrapper>
    </>
  );
}

export default App;
