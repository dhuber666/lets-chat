import React from "react";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Toolbar } from "@material-ui/core";
import NewChatInput from "./NewChatInput";

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

export default function AlignItemsList() {
  const classes = useStyles();

  const fakeArr = Array.from({ length: 100 });

  return (
    <div className={classes.root}>
      <Toolbar />
      <List className={classes.chatlist}>
        {fakeArr.map((v) => renderChat(classes))}
      </List>
      <NewChatInput />
    </div>
  );
}
