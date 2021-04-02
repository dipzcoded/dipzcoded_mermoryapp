import { PostActionTypes, PostTypes, PostObj, Post } from "./types";
import { Action } from "redux";
import { RootState } from "../reducers";
import axios from "axios";
import { ThunkAction } from "redux-thunk";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Action Creators
export const getPosts = (posts: any): PostActionTypes => ({
  type: PostTypes.FETCH_POSTS,
  payload: posts,
});

export const sendPosts = (newPost: PostObj): PostActionTypes => ({
  type: PostTypes.CREATE_POST,
  payload: newPost,
});

export const patchPosts = (updatedPost: PostObj): PostActionTypes => ({
  type: PostTypes.UPDATE_POST,
  payload: updatedPost,
});

export const removePosts = (id: string): PostActionTypes => ({
  type: PostTypes.DELETE_POST,
  payload: id,
});

export const updateLikePost = (updatedPost: PostObj): PostActionTypes => ({
  type: PostTypes.UPDATE_LIKEPOST,
  payload: updatedPost,
});

// Actions dispatch
export const fetchPosts = (): AppThunk => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Cache-Control": "no-cache",
      },
    };
    const { data } = await axios.get("/api/posts", config);
    dispatch(getPosts(data));
  } catch (error) {
    console.log("error from fetch post!");
    dispatch(getPosts([]));
  }
};

export const createPosts = (newPost: any, history: any): AppThunk => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(newPost);
  try {
    const { data } = await axios.post("/api/posts", body, config);
    dispatch(sendPosts(data));
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (
  postId: string,
  newPost: any,
  history: any
): AppThunk => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(newPost);
  try {
    const { data } = await axios.patch(`/api/posts/${postId}`, body, config);
    dispatch(patchPosts(data));
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (postId: string, history: any): AppThunk => async (
  dispatch
) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch(removePosts(postId));
    history.pysh("/");
  } catch (error) {
    console.log(error);
  }
};

export const updatePostLikeCount = (postId: string): AppThunk => async (
  dispatch
) => {
  try {
    const { data } = await axios.patch(`/api/posts/${postId}/likepost`);
    console.log(data);
    dispatch(updateLikePost(data));
  } catch (error) {
    console.log(error);
  }
};
