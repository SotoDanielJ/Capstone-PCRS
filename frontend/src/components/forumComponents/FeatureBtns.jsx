import React, { useState } from "react";
import QFtBtn from "../QFtBtn";
import AiFtBtn from "../AiFtBtn";
import "./style/FeatureBtnShake.css";
import "./style/FeatureBtnFix.css";

const FeatureBtns = () => {
  const [style, setStyle] = useState({});
  const [style2, setStyle2] = useState({});

  const featuresBox = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "20vw",
    height: "100vh",
    padding: "9vh",
  };

  const handleMouseEnter = () => {
    setStyle({
      animation: "shaky 0.8s",
      animationName: "shaky",
      animationDuration: "0.8s",
    });
  };

  const handleMouseLeave = () => {
    setStyle({});
  };
  const handleMouseEnter2 = () => {
    setStyle2({
      animation: "shaky 0.8s",
      animationName: "shaky",
      animationDuration: "0.8s",
    });
  };

  const handleMouseLeave2 = () => {
    setStyle2({});
  };

  return (
    <div style={featuresBox}>
      <div
        style={{
          ...style,
          boxShadow: "0px 5px 15px white",
          borderRadius: "15px", marginBottom: "25px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AiFtBtn />
      </div>
      <div
        style={{
          ...style2,
          boxShadow: "0px 5px 15px white",
          borderRadius: "15px",
        }}
        onMouseEnter={handleMouseEnter2}
        onMouseLeave={handleMouseLeave2}
      >
        <QFtBtn />
      </div>
    </div>
  );
};

export default FeatureBtns;
