import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../style/QuizStyle.css";
import { data } from "../assets/data";
import Loading from "./Loading";
import { AuthContext } from '../context/AuthContext';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [completeQuizArray, setCompleteQuizArray] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [locked, setLocked] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [result, setResult] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const baseUrl = "http://localhost:8080/bot";
  const [loading, setLoading] = useState(false);

  

  const handleNext = () => {
    if (!locked) {
      setLoading(true);
      const updatedAnswers = {
        question: question.question,
        answer: selectedAnswer,
      };
      setCompleteQuizArray((prevArray) => [...prevArray, updatedAnswers]);

      if (index < data.length - 1) {
        setIndex(index + 1);
        setQuestion(data[index + 1]);
        setSelectedAnswer(null);
      } else {
        setResult(true);
        handleResponsesFromApi(completeQuizArray);
      }
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLocked(false);
    setResult(false);
    setCompleteQuizArray([]);
    setSelectedAnswer(null);
    setApiResponse(null);
  };

  const handleAnswerClick = (optionId) => {
    if (!locked) {
      setSelectedAnswer(optionId);
    }
  };

  const handleResponsesFromApi = async (questions) => {
    try {
      const promptString = encodeURIComponent(
        questions.map((q) => `${q.question}: ${q.answer}`).join(", ")
      );
  
      const response = await axios.get(
        `${baseUrl}/selection?question=${questions[0].question}&prompt=${promptString}`,
        {
          headers: {
            Authorization: `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`,
          },
        }
      );
  
      setApiResponse(response.data);
    } catch (error) {
      console.error("Error processing the chat request:", error);
    } finally {
      setLoading(false); // Set loading to false whether the API call is successful or encounters an error
    }
  };

  const handleSave = async () => {
    try {
      if (isLoggedIn && username) {
        const currentUser = { username };
  
        // Fetch API response before saving
  
        // Send the quiz data along with the API response, current user info, and userId to the backend for saving
        await axios.post(`${baseUrl}/saveQuiz`, {
          questions: completeQuizArray.map((q) => q.question).join(", "),
          answers: completeQuizArray.map((q) => q.answer).join(", "),
          apiResponse: apiResponse ? apiResponse.answer : null,
          username: username, // Access username from the context
          
        });
  
        console.log("Quiz data saved successfully!");
      } else {
        console.error("User not logged in");
        console.log(localStorage.getItem('userId'));
        console.log(username);
        setIsLoggedIn(false); // Set isLoggedIn to false when the user is not logged in
      }
    } catch (error) {
      console.error("Error saving quiz data:", error);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    console.log("Stored Username:", storedUsername);

    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
      console.log(storedUsername, 'collected');
    }
  }, [setUsername, setIsLoggedIn]);

  return (
    <div className="container">
      <h1>Questionnaire</h1>
      <hr />
      {result ? (
        <div>
          {apiResponse ? (
            <div>
              <h2>Our Response:</h2>
              <p>{apiResponse.answer}</p>
            </div>
          ) : (
            <Loading loading={loading} />
          )}
          <div className="button-container">
            <button onClick={reset} className="reset-btn">
              <h3>Reset</h3>
            </button>
            <button onClick={handleSave} className="save-btn">
              <h3>Save</h3>
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            {question.options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleAnswerClick(option.id)}
                style={{
                  backgroundColor:
                    selectedAnswer === option.id ? "#D1BE92" : "transparent",
                }}
              >
                {option.text}
              </li>
            ))}
          </ul>
          <div className="next-button">
            <button onClick={handleNext}>Next</button>
          </div>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
    
  );
};

export default Quiz;
