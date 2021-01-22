import React from "react";
import sendMessageIcon from '../icons/sendMessage.png'

import "./input.css";
const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a msg..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <button
        className="sendButton"
        type="submit"
        onClick={(e) => sendMessage(e)}
      >
        <img className="iconImg" src={sendMessageIcon} alt="Send"/>
      </button>
    </form>
  );
};

export default Input;
