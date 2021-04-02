import { AuthActionTypes, AuthTypes } from "./types";
import { Action } from "redux";
import { RootState } from "../reducers";
import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { FormDataTypes } from "../component/auth/Auth";
import setAuthToken from "../utils/setAuthToken";
import Cookie from "js-cookie";
import { getPosts } from "./posts";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// action creators
export const googleLoginData = (data: any): AuthActionTypes => ({
  type: AuthTypes.GOOGLE_LOGIN,
  payload: data,
});

export const logOut = (): AuthActionTypes => ({
  type: AuthTypes.LOGOUT,
});

export const jwtSigning = (userData: any): AuthActionTypes => ({
  type: AuthTypes.JWT_LOGIN,
  payload: userData,
});

// action dispatch
export const loadToken = (): AppThunk => async (dispatch) => {
  const token = JSON.parse(Cookie.get("profile") || "{}")?.token;
  const googleEmail = JSON.parse(Cookie.get("profile") || "{}")?.result?.email;
  if (token || googleEmail) {
    setAuthToken(token, googleEmail);
  }
};

export const googleLogin = (data: any): AppThunk => async (dispatch) => {
  dispatch(googleLoginData(data));
  dispatch(loadToken());
};

export const loggingOut = (history: any): AppThunk => async (dispatch) => {
  dispatch(logOut());
  dispatch(loadToken());
  history.push("/auth");
};

export const SignUp = (
  formData: FormDataTypes,
  history: any
): AppThunk => async (dispatch) => {
  try {
    // signup user
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    const { data } = await axios.post("/api/users/signup", body, config);
    dispatch(jwtSigning(data));
    dispatch(loadToken());
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const SignIn = (formData: any, history: any): AppThunk => async (
  dispatch
) => {
  try {
    // signin user
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    const { data } = await axios.post("/api/users/signin", body, config);
    dispatch(jwtSigning(data));
    dispatch(loadToken());
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
