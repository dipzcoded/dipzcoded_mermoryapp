import { AuthActionTypes, AuthState, AuthTypes } from "../actions/types";

import Cookie from "js-cookie";
const initialState: AuthState = {
  isLoading: true,
  authData: null,
};
const authReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case AuthTypes.GOOGLE_LOGIN:
    case AuthTypes.JWT_LOGIN:
      Cookie.set("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, isLoading: false, authData: { ...action?.payload } };

    case AuthTypes.LOGOUT:
      Cookie.remove("profile");
      return {
        ...state,
        isLoading: false,
        authData: null,
      };
    default:
      return state;
  }
};

export default authReducer;
