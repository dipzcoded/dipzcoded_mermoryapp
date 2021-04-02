import React, { useState } from "react";
import useStyles from "./styles";
import { PostObj } from "../../../actions/types";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { deletePost, updatePostLikeCount } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ThumbUpAltOutlined } from "@material-ui/icons";
import Cookie from "js-cookie";
type Props = {
  post: PostObj | any;
  onCurrentId: (id: string) => void;
};
const PostItem: React.FC<Props> = ({ post, onCurrentId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(Cookie.get("profile") || "null"));

  const Likes = () => {
    if (post.likeCount.length > 0) {
      return post.likeCount.find(
        (like: string) => like === (user?.result?.email || user?.result?.email)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post?.likeCount.length > 2
            ? `You and ${post.likeCount.length - 1} others`
            : `${post.likeCount.length} like${
                post.likeCount.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likeCount.length}{" "}
          {post.likeCount.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.email === post?.creator ||
        user?.result?.email === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => onCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((el: string) => `#${el} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(updatePostLikeCount(post._id))}
        >
          <Likes />
        </Button>
        {(user?.result?.email === post?.creator ||
          user?.result?.email === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id, history))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default PostItem;
