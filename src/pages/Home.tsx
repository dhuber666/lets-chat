import React from "react";
import {
  isLoaded,
  isEmpty,
  useFirestoreConnect,
  useFirestore,
} from "react-redux-firebase";
import { AppState, ChatRoom } from "../reducers";
import { ExtendedFirestoreInstance } from "react-redux-firebase";
import {
  Paper,
  Grid,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  useTheme,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import { useSelector } from "react-redux";
import ChatRoomList from "../components/ChatRoomList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.primary.main,
      color: "white",
      position: "relative",
      overflow: "auto",
      maxHeight: "80vh",
    },
    icon: {
      color: "white",
    },
    listSection: {
      backgroundColor: "inherit",
    },
    addBtn: {
      width: "100%",
      color: theme.palette.secondary.main,
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0,
    },
  })
);

function Home() {
  useFirestoreConnect("chatRooms");
  const firestore: ExtendedFirestoreInstance = useFirestore();

  const chatRooms = useSelector((state: AppState) => {
    return state.firestore.ordered.chatRooms;
  });

  const classes = useStyles();
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
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <ChatRoomList />
      </Grid>
      <Grid item xs={8}>
        <Paper>Right Content</Paper>
      </Grid>
    </Grid>
  );
}

export default Home;
