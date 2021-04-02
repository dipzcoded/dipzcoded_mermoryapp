import { Container, Grid, Grow } from "@material-ui/core";
import { useState, useEffect } from "react";
import AddPost from "../form/AddPost";
import PostView from "../post/PostView";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { fetchPosts } from "../../actions/posts";
import { PostState } from "../../actions/types";
import useStyles from "../../styles";

const Home = () => {
  const dispatch = useDispatch();

  const { posts }: PostState = useSelector(
    (state: RootState) => state.postsState
  );

  const classes = useStyles();
  const [currentId, setCurrentId] = useState<any>(null);
  const [currentPost, setCurrentPost] = useState<any>(undefined);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [fetchPosts, dispatch]);
  const onCurrentId = (id: any) => {
    const curPost = posts.find(({ _id }) => _id === id);

    setCurrentId(id);
    setCurrentPost(curPost);
  };
  return (
    <Grow in>
      <Container>
        <Grid
          container
          className={classes.mainContainer}
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            {/* posts component */}
            <PostView setCurrentId={onCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* form component */}
            <AddPost
              setCurrentId={onCurrentId}
              currentId={currentId}
              currentPost={currentPost}
            />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
