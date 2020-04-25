import React from "react";
import {
  isLoaded,
  isEmpty,
  useFirestoreConnect,
  useFirestore,
} from "react-redux-firebase";
import { AppState } from "../reducers";
import { ExtendedFirestoreInstance } from "react-redux-firebase";
import { useSelector } from "react-redux";
import ChatRoomList from "../components/ChatRoomList";

function Home() {
  useFirestoreConnect("chatRooms");
  const firestore: ExtendedFirestoreInstance = useFirestore();

  const chatRooms = useSelector((state: AppState) => {
    return state.firestore.ordered.chatRooms;
  });

  const addTodo = () => {
    firestore.add("chatRooms", { title: "React", chats: [], users: [] });
  };

  if (!isLoaded(chatRooms)) {
    return <div>Loading...</div>;
  }

  if (isEmpty(chatRooms)) {
    return <button onClick={addTodo}>Add Room "React"</button>;
  }

  return (
    <div style={{ marginTop: 100 }}>
      <ChatRoomList />
    </div>
  );
}

export default Home;
