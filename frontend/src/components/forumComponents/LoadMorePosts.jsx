import React, { useState } from "react";
import "../forumComponents/style/ButtonBounce.css";

const LoadMorePosts = () => {
    const [postIndex, setPostIndex] = useState(0);
    const postChunkSize = 5;
    const [allPostData, setAllPostData] = useState([]);


    const handleLoadMoreClick = () => {
        setPostIndex((prevIndex) => {
            const nextIndex = prevIndex + postChunkSize;
            if (nextIndex >= allPostData.length) {
                return 0;
            } else {
                return nextIndex;
            }
        });
    };
    const LoadMoreBtn = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "10vw",
        height: "3.5vh",
        borderRadius: "10px",
        fontSize: "1em",
        color: "white",
        backgroundColor: "black",
        boxShadow: "0px  5px 15px #000000, inset 0px 5px 15px #000000",
        border: "1px solid black",
        animation: "colorChange 5s infinite",
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <button style={LoadMoreBtn} onClick={handleLoadMoreClick}>
                Load More
            </button>
        </div>
    );
};

export default LoadMorePosts;