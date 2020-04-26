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
import { isEmpty, isLoaded } from "react-redux-firebase";

export default function ClippedDrawer() {
  const history = useHistory();

  const chatRooms = useSelector(
    (state: AppState) => state.firestore.ordered.chatRooms
  );

  console.log("this are the chatRooms: ", chatRooms);

  const navigateToRoom = (roomId: string) => {
    history.push(`/chatRooms/${roomId}`);
  };

  return (
    <div style={{ position: "sticky", top: 0 }}>
      {isLoaded(chatRooms) && !isEmpty(chatRooms) ? (
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
