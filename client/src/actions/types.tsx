export interface Post {
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likeCount?: string[];
}

export interface PostObj extends Post {
  _id: string;
  createdAt: Date;
  name?: string;
}

// state structure
export interface PostState {
  posts: PostObj[];
  isLoading: boolean;
}

export interface AuthState {
  isLoading: boolean;
  authData: any;
}

export enum PostTypes {
  CREATE_POST = "CREATE_POST",
  FETCH_POSTS = "FETCH_POSTS",
  UPDATE_POST = "UPDATE_POST",
  DELETE_POST = "DELETE_POST",
  UPDATE_LIKEPOST = "UPDATE_LIKEPOST",
}

export enum AuthTypes {
  GOOGLE_LOGIN = "GOOGLE_LOGIN",
  LOGOUT = "LOGOUT",
  JWT_LOGIN = "JWT_LOGIN",
}

// actions
interface fetchPostAction {
  type: PostTypes.FETCH_POSTS;
  payload: PostObj[];
}

interface CreatePostAction {
  type: PostTypes.CREATE_POST;
  payload: PostObj;
}

interface UpdatePostAction {
  type: PostTypes.UPDATE_POST;
  payload: PostObj;
}
interface DeletePostAction {
  type: PostTypes.DELETE_POST;
  payload: string;
}

interface UpdateLikePost {
  type: PostTypes.UPDATE_LIKEPOST;
  payload: PostObj;
}

interface googleLogin {
  type: AuthTypes.GOOGLE_LOGIN;
  payload: any;
}

interface Logout {
  type: AuthTypes.LOGOUT;
}

interface SignUp {
  type: AuthTypes.JWT_LOGIN;
  payload: any;
}
interface SignIn {
  type: AuthTypes.JWT_LOGIN;
  payload: any;
}

export type PostActionTypes =
  | fetchPostAction
  | CreatePostAction
  | UpdatePostAction
  | DeletePostAction
  | UpdateLikePost;

export type AuthActionTypes = googleLogin | Logout | SignUp | SignIn;
