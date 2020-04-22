import React, { useState } from "react";

const NewChatInput = () => {
  const [message, setMessage] = useState("");

  return (
    <input
      onKeyDown={(e) => (e.keyCode === 13 ? console.log(message) : null)}
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
