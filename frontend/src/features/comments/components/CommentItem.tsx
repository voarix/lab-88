import React from "react";
import { Box, Typography } from "@mui/material";
import { Comment } from "../../../types";

interface Props {
  comment: Comment;
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  return (
    <Box
      sx={{
        border: "1px solid rgba(156, 39, 176, 0.2)",
        p: 2,
        mb: 1.5,
        borderRadius: 2,
        background: "linear-gradient(145deg, #e1bee7, #bbdefb)",
        boxShadow: "0 4px 8px rgba(63, 81, 181, 0.2)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 6px 12px rgba(63, 81, 181, 0.3)",
        },
        wordBreak: "break-word",
      }}
    >
      <Typography
        variant="caption"
        display="block"
        sx={{ color: "#555", mb: 0.5, fontWeight: 600 }}
      >
        {comment.user.username}
      </Typography>

      <Typography variant="body2" sx={{ mt: 0.5, color: "#333" }}>
        {comment.text}
      </Typography>
    </Box>
  );
};

export default CommentItem;
