// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Quiz from './Quiz';
import Report from './Report';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [quizData, setQuizData] = useState([]);
  const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    if (isQuizActive && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
    if (timer === 0) finishQuiz();
  }, [isQuizActive, timer]);

  const startQuiz = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=15');
      const data = response.data.results.map((item) => ({
        question: item.question,
        options: shuffle([item.correct_answer, ...item.incorrect_answers]),
        correctAnswer: item.correct_answer,
      }));
      setQuizData(data);
      setIsQuizActive(true);
      setUserAnswers(Array(15).fill(null));
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const finishQuiz = () => {
    setIsQuizActive(false);
    setIsQuizFinished(true);
  };

  return (
    <div className="app-container">
      {!isQuizActive && !isQuizFinished && (
        <div className="start-page text-center">
          <h1 className="mb-4">Welcome to CasualFunnel Quiz</h1>
          <input
            type="email"
            className="form-control w-50 mx-auto mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="btn btn-primary btn-lg"
            onClick={startQuiz}
            disabled={!email}
          >
            Start Quiz
          </button>
        </div>
      )}
      {isQuizActive && (
        <Quiz
          quizData={quizData}
          timer={timer}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          finishQuiz={finishQuiz}
        />
      )}
      {isQuizFinished && <Report quizData={quizData} userAnswers={userAnswers} />}
    </div>
  );
}

export default App;
