import React from "react";
import {
  isLoaded,
  isEmpty,
  useFirestoreConnect,
  useFirestore,
} from "react-redux-firebase";
import { AppState, ChatRoom } from "../reducers";
import {
  ExtendedFirebaseInstance,
  useFirebase,
  ExtendedFirestoreInstance,
} from "react-redux-firebase";

import { useSelector } from "react-redux";

function Todos() {
  useFirestoreConnect("chatRooms");
  const firestore: ExtendedFirestoreInstance = useFirestore();

  const chatRooms = useSelector((state: AppState) => {
    return state.firestore.ordered.chatRooms;
  });

  const addTodo = () => {
    firestore.add("chatRooms", { title: "React", chats: [], users: [] });
  };

  console.log(chatRooms);

  if (!isLoaded(chatRooms)) {
    return <div>Loading...</div>;
  }

  if (isEmpty(chatRooms)) {
    return <button onClick={addTodo}>Add Room "React"</button>;
  }

  return (
    <div className="Todos">
      {chatRooms &&
        chatRooms.map((chatRoom: ChatRoom) => {
          return <p key={chatRoom.id}> {chatRoom.title}</p>;
        })}
      <button onClick={addTodo}>Add Room "React"</button>
    </div>
  );
}

export default Todos;
