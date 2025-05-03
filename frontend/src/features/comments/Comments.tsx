import React, { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCommentCreateError,
  selectCommentCreating,
  selectComments,
  selectCommentsLoading,
} from "./commentsSlice";
import { createComment, fetchComments } from "./commentsThunks.ts";
import CommentItem from "./components/CommentItem.tsx";
import CommentForm from "./components/CommentForm.tsx";
import { selectUser } from "../users/usersSlice.ts";

interface Props {
  postId: string;
}

const Comments: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const comments = useAppSelector(selectComments);
  const fetchCommentsLoading = useAppSelector(selectCommentsLoading);
  const createCommentLoading = useAppSelector(selectCommentCreating);
  const createCommentError = useAppSelector(selectCommentCreateError);

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  const handleSubmitComment = async (data: { text: string }) => {
    await dispatch(createComment({ text: data.text }));
    await dispatch(fetchComments(postId));
  };

  return (
    <Box sx={{ mt: 7 }}>
      <Typography variant="h5" sx={{ mb: 6 }}>Comments:</Typography>

      {user && (
        <CommentForm
          onSubmitComment={handleSubmitComment}
          loading={createCommentLoading}
          error={createCommentError}
        />
      )}

      {fetchCommentsLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress size={20} />
        </Box>
      )}

      {comments.length > 0 ? (
        <Box sx={{ mt: 7 }}>
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </Box>
      ) :
        <Typography
          variant="body1"
          sx={{ mt: 4, mb: 5, textAlign: "center", color: "#777" }}
        >
          Comments not yet
        </Typography>
      }
    </Box>
  );
};

export default Comments;
