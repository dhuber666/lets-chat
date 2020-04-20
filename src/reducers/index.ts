import { combineReducers } from "redux";
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

interface User {
  email: string;
  id: string;
  displayName: string;
}

export interface ChatRoom {
  id: string;
  title: string;
  chats: Chat[];
  users: User[];
}

export interface Chat {
  id: string;
  message: string;
  sender: User;
  timestamp: Date;
  chatRoom: ChatRoom;
}

// create schema for the DB
interface DBSchema {
  chatRooms: ChatRoom[];
  chats: Chat[];
  [name: string]: any;
}
interface RootState {
  firebase: FirebaseReducer.Reducer<User, DBSchema>;
  firestore: ReturnType<typeof firestoreReducer>;
}

const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
