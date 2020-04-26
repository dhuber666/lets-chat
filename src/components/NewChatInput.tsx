import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { AppState, Chat } from "../reducers";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";

const NewChatInput = () => {
  const firestore = useFirestore();
  const { chatRoomId } = useParams();

  console.log("this is the id: ", chatRoomId);

  const profile = useSelector((state: AppState) => state.firebase.profile);

  const [message, setMessage] = useState("");

  const submitMessage = async () => {
    setMessage("");

    const newChat: Chat = {
      message,
      chatRoom: chatRoomId!,
      sender: profile,
      timestamp: Date.now(),
    };

    firestore.add(`chatRooms/${chatRoomId}/chats`, newChat);
  };

  return (
    <div
      style={{
        position: "sticky",
        bottom: 5,
      }}
    >
      <TextField
        placeholder="Your Message.."
        style={{ backgroundColor: "white" }}
        variant="outlined"
        fullWidth
        label="message"
        InputLabelProps={{ style: { backgroundColor: "white" } }}
        color="secondary"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => (e.keyCode === 13 ? submitMessage() : null)}
      />
    </div>
  );
};

export default NewChatInput;
