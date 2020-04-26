import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"; // make sure you add this for firestore
import React from "react";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import {
  firebase as fbConfig,
  reduxFirebase as rfConfig,
} from "./firebase/firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./store";

import Home from "./pages/Home";
import { createFirestoreInstance } from "redux-firestore";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Navbar from "./components/Navbar";
import PrivateRoute from "./pages/PrivateRoute";
import ChatList from "./components/ChatList";
import ChatRoomList from "./components/ChatRoomList";
import { Grid } from "@material-ui/core";

// Initialize Firebase instance
firebase.initializeApp(fbConfig);

firebase.firestore();

const ListAndChat = () => (
  <Grid container direction="row">
    <Grid item md={2}>
      <ChatRoomList />
    </Grid>
    <Grid item md={10}>
      <ChatList />
    </Grid>
  </Grid>
);

export default () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rfConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}
    >
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute exact path="/chatRooms/:chatRoomId">
            <ListAndChat />
          </PrivateRoute>
          <Route exact path="/signin">
            <Signin />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>
);
