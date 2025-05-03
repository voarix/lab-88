import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectOnePost, selectOnePostLoading } from "./postsSlice.ts";
import { fetchOnePost } from "./postsThunks.ts";
import Box from "@mui/material/Box";
import { CircularProgress, Typography } from "@mui/material";
import { apiUrl } from "../../globalConstants.ts";
import dayjs from "dayjs";
import Comments from "../comments/Comments.tsx";

const PostFullView = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const post = useAppSelector(selectOnePost);
  const loading = useAppSelector(selectOnePostLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOnePost(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (post) {
    const img = post.image ? `${apiUrl}/${post.image}` : null;

    return (
      <>
        <Box
          sx={{
            mt: 4,
            maxWidth: 600,
            mx: "auto",
            p: 3,
            border: "1px solid #ccc",
            borderRadius: 1,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>

          {img && (
            <Box sx={{ mt: 2 }}>
              <img
                src={img}
                alt={post.title}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          )}

          {post.description && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {post.description}
            </Typography>
          )}

          <Typography variant="body1" display="block" color="text.secondary">
            User: {post.user.username} | Date:{" "}
            {dayjs(post.datetime).format("DD.MM.YYYY HH:mm")}
          </Typography>
        </Box>

        <Comments postId={post._id} />
      </>
    );
  } else {
    return (
      <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
        Post not found
      </Typography>
    );
  }
};

export default PostFullView;
