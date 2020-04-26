import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../reducers";
import { CircularProgress } from "@material-ui/core";

interface Props {
  exact: boolean;
  children: React.ReactNode;
  path: string;
}

const PrivateRoute = ({ children, ...rest }: Props) => {
  const auth = useSelector((state: AppState) => state.firebase.auth);

  console.log("hello from redirect", auth);

  const checkAuth = (location: any) => {
    if (auth.isEmpty && auth.isLoaded) {
      return (
        <Redirect to={{ pathname: "/signin", state: { from: location } }} />
      );
    } else if (auth.isEmpty && !auth.isLoaded) {
      return <CircularProgress />;
    } else {
      return children;
    }
  };

  return <Route {...rest} render={({ location }) => checkAuth(location)} />;
};

export default PrivateRoute;
