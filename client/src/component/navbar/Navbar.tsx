import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { AuthState } from "../../actions/types";
import { useHistory, useLocation } from "react-router-dom";
import { loggingOut } from "../../actions/auth";
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const { isLoading, authData }: AuthState = useSelector(
    (state: RootState) => state.authState
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState<any>(
    JSON.parse(Cookie.get("profile") || "null")
  );

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken: any = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        onLogout();
      }
    }

    setUser(JSON.parse(Cookie.get("profile") || "null"));
  }, [location]);

  const onLogout = () => {
    dispatch(loggingOut(history));
    setUser(null);
  };
  return (
    <AppBar className={classes.appBar} color="inherit" position="static">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src="https://raw.githubusercontent.com/adrianhajdin/project_mern_memories/master/client/src/images/memories.png?token=AF56X74XONEUGZ4FD2FUIA27UURPI"
          alt="memories"
          height="70"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user!.result!.name}
              src={user!.result.imageUrl}
            >
              {user!.result!.name!.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user!.result!.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={onLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
