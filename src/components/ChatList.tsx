import React from "react";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      maxWidth: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    chatlist: {
      overflow: "auto",
    },

    input: {
      position: "sticky",
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

  // @ts-ignore
  useFirestoreConnect({
    collection: "chatRooms/89VzMHrNFHlXEl9uLRWT/chats",
    storeAs: "chats",
    orderBy: "timestamp",
  });

  const chats = useSelector((state: AppState) => state.firestore.ordered.chats);

  console.log(chats);

  return (
    <div className={classes.root}>
      <Toolbar />
      <List className={classes.chatlist}>
        {isLoaded && !isEmpty(chats) ? (
          chats.map((chat: Chat) => (
            <p key={chat.id}>
              {chat.message} - {chat.sender.email}
            </p>
          ))
        ) : (
          <CircularProgress />
        )}
      </List>
      <NewChatInput />
    </div>
  );
}
