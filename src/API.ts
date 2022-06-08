import { shuffleArray } from "./utils";


//grab data from the API

//specify type for each question
//these are the keys in each question and their specific type
//we want the correct and incorrect answer in the same array because we will map through all the answers regardless for the choices
export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type:string;
}

//this is called an intersection. We take the Question type object and the object answers and merges them into one 
//this basically adds another key value pair to Question in a separate type object
//This allows us to add an answers key and value to the data object from the API
export type QuestionState = Question & { answers: string[]};


//because the level of difficulty is limited to only easy, medium and hard we can use an enum 
//This means we can only pick these values not any other value
export enum Difficulty{
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

//we want to specify how many questions we want so wwe are passing in the amount of questions we want and the difficulty we want to fetch for the questions
export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty)=>{
    //because we are passing in the amount and difficulty, we can configure these as we like
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const res = await fetch(endpoint)
    const data= await res.json()
    //map through the fetched data which is a question with exactly the same object shape as the Question type
    //we add all the questions + the answer so we effectively have an array of every question
    //we want to shuffle this array though because the answer will always be at the start of the array.
    // we pass in a new array with a copy of the correct and incorrect answers 
    return data.results.map((question: Question)=>({...question, answers:shuffleArray([...question.incorrect_answers, question.correct_answer])}))
}