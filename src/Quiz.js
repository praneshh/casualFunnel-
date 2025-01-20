import React, { useState, useEffect } from 'react';

function Quiz({ quizData, timer, userAnswers, setUserAnswers, finishQuiz }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [visited, setVisited] = useState(new Set());
    const [answered, setAnswered] = useState(new Set());

    // Mark the current question as visited when the current question changes
    useEffect(() => {
        setVisited((prev) => new Set(prev.add(currentQuestion)));
    }, [currentQuestion]);

    const handleAnswerChange = (index, answer) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[index] = answer;
        setUserAnswers(updatedAnswers);
        setAnswered((prev) => new Set(prev.add(index)));
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <h2>CasualFunnel Quiz</h2>
                <span className="badge bg-info fs-5">Time Left: {formatTime(timer)}</span>
            </div>
            <div className="row mb-3">
                {quizData.map((_, index) => (
                    <button
                        key={index}
                        className={`btn col-1 mx-1 mb-2 ${answered.has(index)
                            ? 'btn-success'
                            : visited.has(index)
                                ? 'btn-warning'
                                : 'btn-outline-secondary'
                            }`}
                        onClick={() => setCurrentQuestion(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className="card p-3 mb-3">
                <h4>Question {currentQuestion + 1}</h4>
                <p dangerouslySetInnerHTML={{ __html: quizData[currentQuestion].question }} />
                <div>
                    {quizData[currentQuestion].options.map((option, idx) => (
                        <div className="form-check" key={idx}>
                            <input
                                type="radio"
                                id={`q${currentQuestion}_option${idx}`}
                                className="form-check-input"
                                name={`question${currentQuestion}`}
                                value={option}
                                checked={userAnswers[currentQuestion] === option}
                                onChange={() => handleAnswerChange(currentQuestion, option)}
                            />
                            <label
                                htmlFor={`q${currentQuestion}_option${idx}`}
                                className="form-check-label"
                                dangerouslySetInnerHTML={{ __html: option }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-between">
                {currentQuestion > 0 && (
                    <button
                        className="btn btn-secondary"
                        style={{ marginRight: '10px' }} // Added margin between Previous and Next buttons
                        onClick={() => setCurrentQuestion((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                )}
                {currentQuestion < quizData.length - 1 && (
                    <button
                        className="btn btn-secondary"
                        style={{ marginLeft: '10px' }} // Added margin between Previous and Next buttons
                        onClick={() => setCurrentQuestion((prev) => prev + 1)}
                    >
                        Next
                    </button>
                )}
                <button className="btn btn-danger ms-auto" onClick={finishQuiz}>
                    Submit Quiz
                </button>
            </div>
        </div>
    );
}

export default Quiz;
