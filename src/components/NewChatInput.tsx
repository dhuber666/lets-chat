import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { AppState, Chat } from "../reducers";

const NewChatInput = () => {
  const firestore = useFirestore();

  const profile = useSelector((state: AppState) => state.firebase.profile);

  const [message, setMessage] = useState("");

  const submitMessage = async () => {
    setMessage("");

    const newChat: Chat = {
      message,
      chatRoom: "89VzMHrNFHlXEl9uLRWT",
      sender: profile,
      timestamp: Date.now(),
    };

    firestore.add("chatRooms/89VzMHrNFHlXEl9uLRWT/chats", newChat);
  };

  return (
    <input
      onKeyDown={(e) => (e.keyCode === 13 ? submitMessage() : null)}
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Your message.."
      style={{
        width: "100%",
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        padding: 20,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        boxSizing: "border-box",
        border: "1px solid teal",
        outline: "none",
      }}
    />
  );
};

export default NewChatInput;
