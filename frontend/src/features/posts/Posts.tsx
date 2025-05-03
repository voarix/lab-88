import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { fetchAllPosts } from "./postsThunks.ts";
import {
  selectAllPosts,
  selectFetchAllPostsLoading,
  selectFetchAllPostsError,
} from "./postsSlice.ts";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import PostItem from "./components/PostItem.tsx";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const loading = useAppSelector(selectFetchAllPostsLoading);
  const error = useAppSelector(selectFetchAllPostsError);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <Box sx={{ mt: 7 }}>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Error: {error.error}
        </Alert>
      )}

      {posts && posts.length > 0 ? (
        <Box>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </Box>
      ) : (
        <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
          Posts not yet
        </Typography>
      )}
    </Box>
  );
};

export default Posts;
