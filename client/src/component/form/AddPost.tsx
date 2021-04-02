import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { createPosts, updatePost } from "../../actions/posts";
import { TextField, Button, Typography, Paper, Input } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Post, PostObj } from "../../actions/types";
import { RootState } from "../../reducers/index";
import { PostState } from "../../actions/types";
import Cookie from "js-cookie";
import { useLocation, useHistory } from "react-router-dom";

type Props = {
  currentId: any;
  setCurrentId: (id: any) => void;
  currentPost: PostObj;
};

const AddPost: React.FC<Props> = ({ setCurrentId, currentId, currentPost }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(Cookie.get("profile") || "null"));
  const classes = useStyles();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (currentPost !== undefined) {
      setPostData({
        title: currentPost.title,
        message: currentPost.message,
        tags: currentPost.tags.join(","),
        selectedFile: currentPost.selectedFile,
      });
    }
  }, [currentPost]);

  useEffect(() => {
    setUser(JSON.parse(Cookie.get("profile") || "null"));
  }, [location]);

  const { tags, message, title, selectedFile } = postData;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, [e.currentTarget.name]: e.currentTarget.value });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let file: any = e.target.files;
    let reader: any = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = () => {
      setPostData({
        ...postData,
        selectedFile: reader.result,
      });
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newPost: any = {
      title,
      tags: tags.split(","),
      message,
      selectedFile,
    };
    if (currentId !== null) {
      dispatch(
        updatePost(currentId, { ...newPost, name: user?.result?.name }, history)
      );
      setCurrentId(null);
    } else {
      dispatch(createPosts({ ...newPost, name: user?.result?.name }, history));
    }

    clear();
  };

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={` ${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId !== null ? "Editing" : "Creating"} a memory
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={title}
          onChange={onChange}
        />

        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={message}
          onChange={onChange}
        />

        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={tags}
          onChange={onChange}
        />
        <div className={classes.fileInput}>
          <Input type="file" onChange={handleImageChange} />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default AddPost;
