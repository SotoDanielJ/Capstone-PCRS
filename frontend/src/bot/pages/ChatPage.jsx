import React, { useState } from "react";
import Axios from "axios";
import "../../style/ChatBot.css";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const baseUrl = "http://localhost:8080/bot/chat";
  const [data, setData] = useState({
    prompt: "",
    response: "",
  });

  const [chatHistory, setChatHistory] = useState([]);
  const [savedChats, setSavedChats] = useState([]);
  const backgroundImage = "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const submit = (e) => {
    e.preventDefault();

    const url = `${baseUrl}?prompt=${encodeURIComponent(data.prompt)}`;

    Axios.get(url)
      .then((res) => {
        const newChat = [...chatHistory, { user: data.prompt, bot: res.data }];
        setChatHistory(newChat);

        setData({
          prompt: "",
          response: res.data,
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const handle = (e) => {
    setData({
      ...data,
      prompt: e.target.value,
    });
  };

  const saveChat = () => {
    const newSavedChats = [...savedChats, ...chatHistory];
    setSavedChats(newSavedChats);
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  const clearChatHistory = () => {
    setSavedChats([]);
  };

  return (
    <div style={{backgroundImage:`url(${backgroundImage})`}}>  
    <div className="page-container">
      <div className="sidebar-chatpage">
        <h1>Saved Chats</h1>
        <ul>
          {savedChats.map((chat, index) => (
            <li key={index}>
              <button
                className="sidebar-button"
                onClick={() => alert(chat.user + ": " + chat.bot)}
              >
                {chat.user}
              </button>
            </li>
          ))}
        </ul>
        <button className="save-button" onClick={saveChat}>
          Save Chat
        </button>
        <button className="clear-button" onClick={clearChat}>
          Clear Chat
        </button>
        <button className="clear-history-button" onClick={clearChatHistory}>
          Clear Chat History
        </button>
      </div>
      <div className="chat-container">
        <div className="chat-box">
          {chatHistory.map((chat, index) => (
            <div key={index} className="message-container">
              <div className="user-message">{chat.user}</div>
              <div className="bot-message">{chat.bot}</div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => submit(e)}>
          <input className="input"
            onChange={(e) => handle(e)}
            value={data.prompt}
            placeholder="Enter your message"
            type="text"
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ChatPage;
