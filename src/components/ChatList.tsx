import React, { useRef, useEffect } from "react";
import List from "@material-ui/core/List";
import { CircularProgress } from "@material-ui/core";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { AppState, Chat } from "../reducers";
import { useParams } from "react-router-dom";
import ChatItem from "./ChatItem";

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

  console.log("But is it loaded?", isLoaded(chats));
  console.log(chats);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "auto" });
  });

  if (!isLoaded(chats)) {
    return <CircularProgress />;
  }

  if (isLoaded && isEmpty(chats)) {
    return (
      <div>
        <p>
          No chats yet! Be the first to write a message on the input on the
          bottom.
        </p>
      </div>
    );
  }

  return (
    <div>
      <List>
        {chats.map((chat: Chat, index: number, array: Chat[]) => {
          let renderAvatar = true;

          if (
            index > 0 &&
            chat.sender.email === array[index - 1].sender.email
          ) {
            renderAvatar = false;
          }

          console.log("render Avatar?", renderAvatar);

          return (
            <ChatItem key={chat.id} chat={chat} renderAvatar={renderAvatar} />
          );
        })}
      </List>
      <div ref={chatRef} />
    </div>
  );
}
