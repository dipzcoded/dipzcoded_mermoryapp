import React, { useState, useEffect } from "react";
import PostItem from "./postitem/PostItem";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";
import { PostState } from "../../actions/types";
import useStyles from "./styles";
import Cookie from "js-cookie";
import { useLocation } from "react-router-dom";

type Props = {
  setCurrentId: (id: string) => void;
};
const PostView: React.FC<Props> = ({ setCurrentId }) => {
  const location = useLocation();
  const postsState: PostState = useSelector(
    (state: RootState) => state.postsState
  );
  const [user, setUser] = useState(JSON.parse(Cookie.get("profile") || "null"));
  useEffect(() => {
    setUser(JSON.parse(Cookie.get("profile") || "null"));
  }, [location]);
  const { posts, isLoading } = postsState;
  const classes = useStyles();
  const onCurrentId = (id: string) => {
    setCurrentId(id);
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : !isLoading && !posts.length ? (
        <>
          {user && (
            <Typography variant="h6" color="textPrimary">
              no post available.... be the first to create one!
            </Typography>
          )}
        </>
      ) : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <PostItem post={post} onCurrentId={onCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default PostView;
