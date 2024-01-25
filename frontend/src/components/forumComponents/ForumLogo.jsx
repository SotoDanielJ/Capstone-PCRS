import React from "react";
import ScriptLogo from '../Design.png';

const ForumLogo = () => {

    const logoContainer = {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "8vh",
        height: "40vh",
        width: "47vw",
    };

    const scriptLogo = {
      display: "flex",
      flexDirection: "row",
      height: "16vh",
      width: "14vw",
      borderRadius: "55px",
      boxShadow: "0px  5px 15px #c8c8c8, inset 0px 5px 15px #c8c8c8",
    };

return (
    <div style={logoContainer}>
        <img
            src={ScriptLogo}
            alt="the Script logo: a stylized, curvy letter S in a laptop screen"
            style={scriptLogo}
        />
    </div>
);
};

export default ForumLogo;