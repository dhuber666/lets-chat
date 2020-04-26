import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../reducers";
import { useFirebase } from "react-redux-firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {},
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Logout = () => {
  const firebase = useFirebase();

  return (
    <Typography
      style={{ textDecoration: "none", color: "inherit" }}
      component={Link}
      to="/"
      variant="inherit"
      onClick={() => firebase.logout()}
    >
      Logout
    </Typography>
  );
};

const Login = () => (
  <Typography
    style={{ textDecoration: "none", color: "inherit" }}
    component={Link}
    to="/signin"
    variant="inherit"
  >
    Login
  </Typography>
);

export default function ClippedDrawer() {
  const classes = useStyles();

  const auth = useSelector((state: AppState) => state.firebase.auth);

  return (
    <header>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            component={Link}
            to="/"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Simple Chat
          </Typography>

          {auth.isLoaded ? !auth.isEmpty ? <Logout /> : <Login /> : ""}
        </Toolbar>
      </AppBar>
    </header>
  );
}
