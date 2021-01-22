import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import queryString from "query-string";
import InfoBar from "../Infobar/Infobar.js";
import Input from "../input/Input";
import Messages from "../messages/Messages";
import TextArea from '../textArea/TextArea'
import "./chat.css";
let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://socket-react-application.herokuapp.com/";

  useEffect(() => {
    const data = queryString.parse(location.search); //we get location from react-router and it contains value that value we passed in url and then querystring makes object of that information e.g{name: hjk, room: 88}
    const { name, room } = data;
    console.log(data.name, data.room);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name: name, room: room }, () => {}); //we have make object in es6 can also be writtten as { name: name, room:room }

    return () => {
      //this works as component willunmount
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]); //[endpoint,location.search] means when only these two changes the useEffect will work

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on("roomData",({users})=>{
      setUsers(users);
    })
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("user-send-message", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextArea users={users} />
    </div>
  );
}

export default Chat;
