import React from "react";
import { Box, Typography } from "@mui/material";
import { Post } from "../../../types";
import { apiUrl } from "../../../globalConstants";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs from "dayjs";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const img = post.image ? `${apiUrl}/${post.image}` : null;

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        mb: 2,
        borderRadius: 1,
        overflow: "hidden",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        {img ? (
          <Box sx={{ width: 170, height: 130 }}>
            <img
              src={img}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              width: 170,
              height: 130,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#eee",
              color: "#555",
            }}
          >
            <DescriptionIcon sx={{ fontSize: 70 }} />
          </Box>
        )}

        <Box
          sx={{
            ml: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" display="block" color="text.secondary">
            User: {post.user.username} | Date:{" "}
            {dayjs(post.datetime).format("DD.MM.YYYY HH:mm")}
          </Typography>

          <Typography variant="h6" component="div" sx={{ mt: 0.5 }}>
            {post.title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PostItem;
