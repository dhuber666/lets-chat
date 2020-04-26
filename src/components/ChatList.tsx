import React, { useRef, useEffect } from "react";

import List from "@material-ui/core/List";
import { CircularProgress } from "@material-ui/core";
import NewChatInput from "./NewChatInput";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { AppState, Chat } from "../reducers";
import { useParams } from "react-router-dom";

export default function ChatList() {
  const { chatRoomId } = useParams();

  const chatRef = useRef<HTMLDivElement>(null);

  // @ts-ignore
  useFirestoreConnect({
    collection: `chatRooms/${chatRoomId}/chats`,
    storeAs: "chats",
    orderBy: "timestamp",
  });

  const chats = useSelector((state: AppState) => state.firestore.ordered.chats);

  console.log(chats);

  useEffect(() => {
    chatRef.current?.scrollIntoView();
  });

  if (isLoaded && isEmpty(chats)) {
    return (
      <div>
        <p>No chats yet!</p>
        <NewChatInput />
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",

        width: "100%",
        scrollBehavior: "smooth",
      }}
    >
      <List>
        {isLoaded ? (
          chats.map((chat: Chat) => (
            <p key={chat.id}>
              {chat.message} - {chat.sender.email}
            </p>
          ))
        ) : (
          <CircularProgress />
        )}
      </List>
      <div ref={chatRef} />

      <NewChatInput />
    </div>
  );
}
