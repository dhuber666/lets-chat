import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { AppState } from "../reducers";
import useIsMounted from "ismounted";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    gridColumn: "1fr",
    gridRow: "1fr",
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

export default function SignIn() {
  const classes = useStyles();
  const firebase = useFirebase();
  const auth = useSelector((state: AppState) => state.firebase.auth);
  const history = useHistory();

  // i need this to get rid of pending setState from firebase promise
  const isMounted = useIsMounted();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  console.log("is mounted?", isMounted.current);

  React.useEffect(() => {
    if (!auth.isEmpty && auth.isLoaded) {
      history.push("/");
    } else {
      setIsLoading(!auth.isLoaded);
    }
  }, [auth.isLoaded, auth.isEmpty, history]);

  const signin = async (e: React.MouseEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const user = await firebase.login({ email, password });
      isMounted.current && setIsLoading(false);
      if (user) {
        history.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const forgotPwd = () => {
    firebase.resetPassword(email);
  };

  return (
    <div id="signin">
      {!isLoading ? (
        <>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
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
              onClick={signin}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={forgotPwd}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
