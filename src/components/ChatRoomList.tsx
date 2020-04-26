import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FaReact } from "react-icons/fa";
import { DiApple } from "react-icons/di";

import { Icon, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState, ChatRoom } from "../reducers";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";

export default function ClippedDrawer() {
  const history = useHistory();
  useFirestoreConnect("chatRooms");

  const chatRooms = useSelector(
    (state: AppState) => state.firestore.ordered.chatRooms
  );

  const navigateToRoom = (roomId: string) => {
    history.push(`/chatRooms/${roomId}`);
  };

  return (
    <div>
      {isLoaded(chatRooms) ? (
        <List>
          {chatRooms.map((chatRoom: ChatRoom) => (
            <ListItem
              button
              key={chatRoom.id}
              onClick={() => navigateToRoom(chatRoom.id)}
            >
              <ListItemIcon>
                <Icon
                  component={chatRoom.title === "React" ? FaReact : DiApple}
                />
              </ListItemIcon>
              <ListItemText primary={chatRoom.title} />
            </ListItem>
          ))}
        </List>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
