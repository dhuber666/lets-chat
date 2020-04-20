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

import store from "./store";

import Home from "./pages/Home";
import { createFirestoreInstance } from "redux-firestore";

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
      <Home />
    </ReactReduxFirebaseProvider>
  </Provider>
);
