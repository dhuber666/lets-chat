import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Toolbar } from "@material-ui/core";
import { useFirebase } from "react-redux-firebase";
import { FirebaseError } from "firebase";
import { Link as RouterLink, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const firebase = useFirebase();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const signup = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      console.log("password doesnt match");
      return setError("Passwords doesn't match");
    }

    firebase
      .createUser({ email, password })
      .then((user) => history.push("/"))
      .catch((e: FirebaseError) => setError(e.message));

    // create user and forward to chats
  };

  return (
    <div id="signin">
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Repeat Password"
          type="password"
          id="password2"
          autoComplete="current-password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        {error.length > 0 && (
          <Typography variant="caption" color="secondary">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={signup}
        >
          Sign In
        </Button>
        <Grid container justify="center">
          <Grid item>
            <Link component={RouterLink} to="/signin" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
