import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Chat } from "../reducers";

interface Props {
  chat: Chat;
  renderAvatar: boolean;
}

const ChatItem = ({ chat, renderAvatar }: Props) => (
  <ListItem alignItems="flex-start">
    {renderAvatar ? (
      <ListItemAvatar>
        <Avatar
          alt={chat.sender.email}
          src="/static/images/avatar/1.jpg"
          color="secondary"
        />
      </ListItemAvatar>
    ) : (
      <ListItemAvatar style={{ height: 0 }}>
        <Avatar hidden style={{ opacity: 0, height: 0 }} />
      </ListItemAvatar>
    )}

    <ListItemText
      title={chat.message}
      style={{ height: 5 }}
      primary={
        renderAvatar ? (
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="secondary"
              style={{ display: "inline" }}
            >
              {`${new Date(chat.timestamp).getHours().toString()}:${new Date(
                chat.timestamp
              )
                .getMinutes()
                .toString()} - ${chat.sender.email}`}
            </Typography>
          </React.Fragment>
        ) : null
      }
      secondary={
        <Typography variant="body2" color="primary">
          {chat.message}
        </Typography>
      }
    />
  </ListItem>
);

export default ChatItem;
