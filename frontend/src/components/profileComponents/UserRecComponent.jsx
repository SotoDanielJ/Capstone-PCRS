import UserRecInfoComponent from "./UserRecInfoComponent";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';

const UserRecComponent = () => {
  const { username } = useContext(AuthContext); // Assuming you have an AuthContext for managing user authentication
  const [userData, setUserData] = useState({
    apiResponse: null,
  });

  const recHolder = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "98%",
    width: "98%",
    borderRadius: "15px",
  };

  const recTitle = {
    color: "white",
    fontSize: "2em",
    margin: "0",
  };
  const recUser = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "48vh",
    width: "20vw",
    borderRadius: "15px",
  };

  const recNav = {
    display: "flex",
    justifyContent: "center",
    gap: "1vw",
    margin: "2vh 1vw",
  };

  const recNavButton = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "4vw",
    height: "3vh",
    borderRadius: "15px",
    backgroundColor: "#00C3FF",
    fontWeight: "bold",
    fontSize: "1em",
  };

  const recInfo = {
    display: "flex",
    height: "38vh",
    width: "17vw",
    borderRadius: "15px",
    padding: "2%",
    border: "1px solid white",
  };

  const [currentUserRecIndex, setCurrentUserRecIndex] = useState(0);

  const handleNextClick = () => {
    console.log("click documented");
    setCurrentUserRecIndex(
      (prevIndex) => (prevIndex + 1) % UserRecInfoComponent.length
    );
  };

  const handleBackClick = () => {
    console.log("click documented");
    setCurrentUserRecIndex(
      (prevIndex) =>
        (prevIndex - 1 + UserRecInfoComponent.length) %
        UserRecInfoComponent.length
    );
  };

  const handleViewClick = async () => {
    try {
      if (username) {
        // Fetch quiz data using the username
        const quizDataResponse = await axios.get(
          `http://localhost:8080/bot/getRecommendation?username=${username}`
        );

        // Use the stored API response from the database
        const apiResponse = quizDataResponse.data.apiResponse;

        // Update component state with fetched data
        setUserData((prevUserData) => ({
          ...prevUserData,
          quizData: quizDataResponse.data,
          apiResponse: apiResponse,
        }));
      }
    } catch (error) {
      console.error("Error fetching quiz data and API response:", error);
    }
  };

  return (
    <div style={recHolder}>
      <div style={recUser}>
        <div style={{ paddingTop: "1vh" }}>
          <p style={recTitle}>Recommendations</p>
        </div>
        <div style={recNav}></div>
        <div style={{ ...recInfo, overflow: "auto" }}>
          <div style={{ color: "white", fontSize: "0.9em", textAlign: "left" }}>
            {userData.apiResponse ? (
              <>
                
                <div>{userData.apiResponse}</div>
              </>
            ) : (
              <div>Click on View to see your saved recommendations!!</div>
            )}
          </div>
        </div>
        <div style={recNav}>
          <button style={recNavButton} onClick={handleBackClick}>
            Back
          </button>
          <button style={{ ...recNavButton, backgroundColor: "#00FF7A" }} onClick={handleViewClick}>
            View
          </button>
          <button style={recNavButton} onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRecComponent;