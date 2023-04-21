// Import essential components.
import React, { useState, useEffect } from 'react';
import './QuizApp.css';
import { questions } from './question';

const QuizApp = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [timer, setTimer] = useState(300);
    const [selectedOption, setSelectedOption] = useState(null);
    const [bestScore, setBestScore] = useState(0);


    // useEffect hook to manage the countdown timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer => timer - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // useEffect hook to show quiz result when timer reaches 0
    useEffect(() => {
        if (timer === 0) {
            setShowResult(true);
        }
    }, [timer]);

    // useEffect hook to retrieve and set the best score from local storage
    useEffect(() => {
        const storedBestScore = localStorage.getItem('bestScore');
        if (storedBestScore) {
            setBestScore(Number(storedBestScore));
        }
    }, []);

    // Function to handle when a user selects an answer for a question
    const handleAnswerSelect = (selectedAnswer) => {
        console.log('Selected Answer:', selectedAnswer);
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = selectedAnswer;
        setUserAnswers(updatedAnswers);
        setSelectedOption(selectedAnswer);
    };
    const handleOptionClick = (selectedAnswer) => {
        handleAnswerSelect(selectedAnswer);
        handleButtonClick();
    };

    const renderQuizQuestion = () => {
        const question = questions[currentQuestionIndex];

        return (
            <div>
                <h2>Question {currentQuestionIndex + 1}</h2>
                <p>{question.question}</p>
                <ul>
                    {question.options.map((option) => (
                        <li key={option}>
                            <button
                                onClick={(e) => handleOptionClick(option)}
                                className={buttonClicked ? 'clicked' : ''}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
                <div>
                    <button onClick={handlePreviousQuestion}>Previous</button>
                    <button onClick={handleNextQuestion}>Next</button>
                </div>
                <p>Time Remaining: {Math.floor(timer / 60)}:{timer % 60}</p>
                {showResult ? renderQuizResult() : null}
            </div>
        );
    };

    // Function to handle when a user clicks on an option button
    const handleButtonClick = () => {
        setButtonClicked(true);
    };
    // Function to handle when a user clicks on the "Next" button
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setButtonClicked(false);
        } else {
            setShowResult(true);
        }
    };
    // Function to handle when a user clicks on the "Previous" button
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
            setButtonClicked(false);
        }
    };

    // Function to handle when a user clicks on the "Restart Quiz" button
    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setShowResult(false);
        setTimer(300);
        setSelectedOption(null);
        setButtonClicked(false);
    };

    // Function to render the quiz result
    const renderQuizResult = () => {
        const correctAnswers = userAnswers.filter(
            (userAnswer, index) => userAnswer === questions[index].correctAnswer
        );
        const score = (correctAnswers.length / questions.length) * 100;

        // Update best score if current score is higher
        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem('bestScore', score);
        }

        return (
            <div>
                <h2>Quiz Result</h2>
                <p>
                    You answered {correctAnswers.length} out of {questions.length} questions correctly.
                </p>
                <p>Your score: {score}%</p>
                <button onClick={handleRestartQuiz}>Restart Quiz</button>
                <br/>
                {showResult && (
                    <div>
                        <h2>Review Incorrect Answers</h2>
                        <ul>
                            {userAnswers.map((userAnswer, index) => {
                                const question = questions[index];
                                return (
                                    userAnswer !== question.correctAnswer && (
                                        <li key={index}>
                                            <p className="question-question">
                                                <strong>Question {index + 1}: </strong>
                                                {question.question}
                                            </p>
                                            <p className="user-answer">
                                                <strong>Your Answer: </strong>
                                                {userAnswer}
                                            </p>
                                            <p className="correct-answer">
                                                <strong>Correct Answer: </strong>
                                                {question.correctAnswer}
                                            </p>
                                        </li>
                                    )
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        );
    };


    return (
        <div>
            {showResult ? renderQuizResult() : renderQuizQuestion()}
            <h2>Best Score in History: {bestScore}%</h2>
        </div>
    );
};
export default QuizApp;















