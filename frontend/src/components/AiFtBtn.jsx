import React from "react";
import { Link } from "react-router-dom";
import aiImage from './m-n.jpg';

const AiFtBtn = () => {
  return (
    <Link to="/ChatPage">
      <img
      src={aiImage}
      alt="a robot assistant at a computer; by Mohamed Nohassi from Unsplash"
        style={{ cursor: "pointer" }}
        className="ai-image"
      />
    </Link>
  );
};

export default AiFtBtn;
