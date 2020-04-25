import React, { useRef, useEffect } from "react";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Toolbar, CircularProgress } from "@material-ui/core";
import NewChatInput from "./NewChatInput";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { AppState, Chat } from "../reducers";
import { useParams } from "react-router-dom";

// theme.palette.background.paper,

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      maxWidth: "100%",
      minHeight: "100%",
      backgroundColor: "teal",
      overflow: "auto",
    },
    inline: {
      display: "inline",
    },
  })
);

const renderChat = (classes: Record<"inline" | "root", string>) => (
  <>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Tommi Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary="Brunch this weekend?"
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              Ali Connors
            </Typography>
            {" — I'll be in your neighborhood doing errands this…asdfasdfdsf"}
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
  </>
);

export default function ChatList() {
  const classes = useStyles();
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
