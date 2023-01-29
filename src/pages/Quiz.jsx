import React, { useState, useEffect } from 'react';



function Quiz(props) {
  const [quizData, setQuizData] = useState([]);
  const [isQuiz, setIsQuiz] = useState(true)
  const [options, setOptions] = useState([])
  const [answerIndex, setAnswerIndex] = useState(null)
  
  
  const id = () => Math.random().toString(36)


  const handleOption = (id, correct_answer) => {
    setOptions((prev) => {
      const newState = prev.filter((s) => s.id !== id);
      return [...newState, { id, correct_answer }];
    });
  };
  
  const isSelectedOption = (qId, answer) => {
    console.log(answer);
    return options.find((opt) => opt.id === qId)?.correct_answer === answer ? true : false
  }
  

  const isCorrectAnswer = (qId, answer) => {
    const question = quizData.find((data) => data.id === qId)
    return answer === question.correct_answer
  }

  const noOfCorrectAnswer = quizData.filter((question) => {
    const selectedAnswer = options.find(
      (sel) => sel.id === question.id
    )?.correct_answer;
    const isCorrect = isCorrectAnswer(question.id, selectedAnswer);
    return isCorrect;
  }).length;

  const checkAnswers = () => {
    if (isQuiz) {
      setIsQuiz(false);
    } else { props.setNotes(false) }
  }
  
  // const answered = quizData.options.filter(ans => isSelectedOption(ans))

    

  useEffect(() => {
    fetch(
      'https://opentdb.com/api.php?amount=5&category=27&difficulty=medium&type=multiple'
    )
      .then((res) => res.json())
      .then((data) => setQuizData(data.results.map(item => {
      const answers = [...item.incorrect_answers]
      const randonPosition = Math.floor(Math.random() * 3)
        answers.splice(randonPosition, 0, item.correct_answer)
        console.log(item);
        return {
          ...item, answers, id: id()
        }
        
    })))
  }, []);

console.log("quiz", quizData);
  return (
    <>
      <div>
        {quizData.map((item, index) => {
          return (
            <div className='quiz-contents' key={'quiz' + index}>
              <h3>{item.question}</h3>
              <div className='options'>
                {item.answers.map((answer) => {
                  const isAnswerMode = !isQuiz;
                  const optionSelected =
                    isQuiz && isSelectedOption(item.id, answer);
                  const optionIsCorrect =
                    isAnswerMode && isCorrectAnswer(item.id, answer);

                  const isNotCorrectAnswer = !isCorrectAnswer(item.id, answer);

                  const optionIsNotCorrect =
                    isAnswerMode &&
                    isSelectedOption(item.id, answer) &&
                    isNotCorrectAnswer;

                  return (
                    <span
                      // disabled={!isQuiz}
                      key={answer}
                      // style={{
                      //   backgroundColor: options ? '#D6DBF5' : '#F5F7FB',
                      // }}
                      onClick={() => handleOption(item.id, answer)}
                      className={[
                        optionSelected && 'selected-answer',
                        optionIsCorrect && 'correct-answer',
                        optionIsNotCorrect && 'incorrect-answer',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {answer}
                    </span>
                  );
                })}
              </div>
              <div className='line'></div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '80px' }}>
        {!isQuiz && (
          <span
            style={{
              fontSize: '25px',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '700',
            }}
          >
            Your score is {noOfCorrectAnswer} / {quizData.length}
          </span>
        )}

        <button
          disabled={options.length < 5}
          style={{
            backgroundColor: options.length < 5 ? '#d6dbf5' : '#293264',
          }}
          className='check-btn'
          onClick={checkAnswers}
        >
          {isQuiz ? 'Check answers' : 'Play again'}
        </button>
      </div>
    </>
  );
}

export default Quiz