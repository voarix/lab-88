import { Typography } from "@mui/material";
import PostForm from "./components/PostForm.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { addNewPost } from "./postsThunks.ts";
import { useNavigate } from "react-router-dom";
import { GlobalError, PostMutation, ValidationError } from "../../types";
import {
  selectCreatePostError,
  selectCreatePostLoading,
} from "./postsSlice.ts";

const NewPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreatePostLoading);
  const error = useAppSelector(selectCreatePostError);

  const onCreateNewPost = async (newPost: PostMutation) => {
    try {
      await dispatch(addNewPost(newPost)).unwrap();
      toast.success("Post was successfully created!");
      navigate("/");
    } catch (e) {
      toast.error("Post failed to create a new post!");
      console.error(e);
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        New Post
      </Typography>
      <PostForm
        onSubmitPost={onCreateNewPost}
        loading={loading}
        error={error as ValidationError | GlobalError | null}
      />
    </>
  );
};

export default NewPost;
