import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { PostActionTypes } from "../actions/types";
import { composeWithDevTools } from "redux-devtools-extension";
import postReducer from "./posts";
import authReducer from "./auth";
export const rootReducer = combineReducers({
  postsState: postReducer,
  authState: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<RootState, PostActionTypes>)
  )
);
