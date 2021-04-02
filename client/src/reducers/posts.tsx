import { PostTypes, PostActionTypes, PostState } from "../actions/types";

const initialState: PostState = {
  posts: [],
  isLoading: true,
};

const postReducer = (state = initialState, action: PostActionTypes) => {
  switch (action.type) {
    case PostTypes.FETCH_POSTS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };

    case PostTypes.CREATE_POST:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, action.payload],
      };

    case PostTypes.UPDATE_POST:
    case PostTypes.UPDATE_LIKEPOST:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case PostTypes.DELETE_POST:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    default:
      return state;
  }
};

export default postReducer;
