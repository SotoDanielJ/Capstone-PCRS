import React, { useState } from "react";
import Quiz from "../../components/Quiz.jsx";
import { data } from "../../assets/data.js";
import "../..//style/QuestionnaireStyle.css";

import ProductSlider from "../../components/ProductSlider.jsx";

const QuestionnairePage = () => {
  const [completedQuiz, setCompletedQuiz] = useState([]);

  const backgroundImage ="https://images.unsplash.com/photo-1705877883568-a26cbc63bce2?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleQuizCompletion = (answers) => {
    setCompletedQuiz(answers);
  };

  return (
    
    <div className="main" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", height: "100vh" }}>

      {/* <SideBar/> */}
      <div className="quiz-container">
        <Quiz data={data} onComplete={handleQuizCompletion} />
      </div>

      <div className="products">

        
      </div>
      <ProductSlider/>
    </div>
  );
};

export default QuestionnairePage;
