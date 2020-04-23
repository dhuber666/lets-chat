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

// Initialize Firebase instance
firebase.initializeApp(fbConfig);

firebase.firestore();

export default () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rfConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}
    >
      <Router>
        <div>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <Route exact path="/signin">
              <Signin />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </Switch>
        </div>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>
);
