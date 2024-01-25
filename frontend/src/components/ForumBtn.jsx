import React from "react";
import { Link } from "react-router-dom";
import fImage from "./nasa.jpg";

const ForumBtn = () => {
  return (
    <Link to="/ScriptHome">
      <img
        src={fImage}
        alt="out of space view of Earth at night lit up by cities, by Nasa on Unsplash"
        style={{ cursor: "pointer" }}
        className="f-image"
      />
    </Link>
  );
};

export default ForumBtn;
