import React from "react";
import { Link } from "react-router-dom";
import qImage from "./s-g-unsplash.jpg";


const QFtBtn = () => {
  return (
    <Link to="/Selection">
      <img
        src={qImage}
        alt="a person filling out paperwork; by Scott Graham from Unsplash"
        style={{ cursor: "pointer" }}
        className="q-image"
      />
    </Link>
  );
};

export default QFtBtn;
