import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { GoogleLogin } from "react-google-login";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { SignIn, SignUp } from "../../actions/auth";
import Cookie from "js-cookie";

export interface FormDataTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const Auth = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [user, setUser] = useState(JSON.parse(Cookie.get("profile") || "null"));
  const [formData, setFormData] = useState<FormDataTypes>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(
        SignUp(
          { firstName, lastName, email, password, confirmPassword },
          history
        )
      );
    } else {
      dispatch(SignIn({ email, password }, history));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = (e: any): void => {
    setShowPassword(!showPassword);
  };
  const switchMood = (): void => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };
  const googleSuccess = async (res: any): Promise<void> => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch(googleLogin({ result, token }));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (err: any): void => {
    console.log(err);
    console.log("Google Sign in was unsuccesful. Try Again later");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="first Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  type="text"
                  value={firstName}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  type="text"
                  value={lastName}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              value={email}
            />
            <Input
              name="password"
              label="password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              value={password}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="128993182574-damhlk9341s37vsn1lrus8jo6vc1j8gt.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMood}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Dont have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
