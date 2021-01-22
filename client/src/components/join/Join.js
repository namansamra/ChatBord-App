import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./join.css";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <div className="heading">ChatBord</div>
        <div>
          <input
            type="text"
            className="joinInput"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="joinInput"
            placeholder="Room"
            onChange={(e) => setRoom(e.target.value)}git 
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)} //for validation(in react required doesn't work in inputs)
          to={`/chat?name=${name}&room=${room}`}
        >
          <button type="submit" className="button mt-20">
            Sign Up 
          </button>
        </Link>
      </div>
    </div>
  );
}

export default   Join;
