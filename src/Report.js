import React, { useEffect, useRef } from 'react';

function Report({ quizData, userAnswers }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = chartRef.current.chartInstance;

            // Cleanup the previous chart instance when the component unmounts
            return () => {
                if (chartInstance) {
                    chartInstance.destroy();
                }
            };
        }
    }, []);

    const totalQuestions = quizData.length;
    const correctAnswers = quizData.filter(
        (item, index) => userAnswers[index] === item.correctAnswer
    ).length;

    const data = {
        labels: ['Correct', 'Incorrect'],
        datasets: [
            {
                data: [correctAnswers, totalQuestions - correctAnswers],
                backgroundColor: ['#28a745', '#dc3545'],
                hoverBackgroundColor: ['#218838', '#c82333'],
            },
        ],
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">Quiz Report</h2>
            <p className="text-center mb-4">
                You answered <strong>{correctAnswers}</strong> out of <strong>{totalQuestions}</strong>{' '}
                questions correctly.
            </p>

            {/* Table moved to the top */}
            <div className="mb-4 w-100">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Your Answer</th>
                            <th>Correct Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizData.map((item, index) => (
                            <tr key={index}>
                                <td dangerouslySetInnerHTML={{ __html: item.question }} />
                                <td
                                    className={
                                        userAnswers[index] === item.correctAnswer ? 'text-success' : 'text-danger'
                                    }
                                    dangerouslySetInnerHTML={{ __html: userAnswers[index] || 'Not Answered' }}
                                />
                                <td dangerouslySetInnerHTML={{ __html: item.correctAnswer }} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Report;
