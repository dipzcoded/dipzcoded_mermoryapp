import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import Navbar from "./component/navbar/Navbar";
import Home from "./component/home/Home";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Auth from "./component/auth/Auth";
import setAuthToken from "./utils/setAuthToken";
import Cookie from "js-cookie";
import { loadToken } from "./actions/auth";
import { useDispatch } from "react-redux";

const token = JSON.parse(Cookie.get("profile") || "{}")?.token;
const googleEmail = JSON.parse(Cookie.get("profile") || "{}")?.result?.email;
if (token || googleEmail) {
  setAuthToken(token, googleEmail);
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch, loadToken]);
  return (
    <Router>
      <Container maxWidth="lg">
        {/* Navbar */}
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/auth" component={Auth} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
