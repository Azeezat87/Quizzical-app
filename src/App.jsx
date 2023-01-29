import { useState } from 'react'
import Quiz from './pages/Quiz'


function App() {
  const [notes, setNotes] = useState(false);


  return (
    <main>
      {notes ? (
        <section className='quiz-page'>
          <Quiz setNotes={setNotes} />
        </section>
      ) : (
        (
          <section className='start-quiz'>
            <h1>Quizzical</h1>
            <p>Unlock your trivial potential with this thrilling quiz challenge</p>
            <button onClick={() => setNotes(true)}>
              Start Quiz
            </button>
          </section>
        )
      )}
    </main>
  );
}

export default App


// function quizQuestions() {
//   let questions = [];

//   fetch(
//     'https://opentdb.com/api.php?amount=5&category=27&difficulty=medium&type=multiple'
//   )
//     .then((res) => res.json())
//     .then(loadedQuestions => {
//       console.log(loadedQuestions.results)
//       questions = loadedQuestions.results.map(loadedQuestion => {
//         const formattedQuestion = {
//           question: loadedQuestion.question
//         }
        
//         const answerChoices = [...loadedQuestion.incorrect_answers]
//         formattedQuestion.answer = Math.floor(Math.random() * 3) + 1
//         answerChoices.splice(
//           formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer
//         )

//         answerChoices.forEach((choice, index) => {
//           formattedQuestion['choice' + (index + 1)] = choice
//         })
//         return formattedQuestion
//       });
//     })
// }
// console.log(quizQuestions())