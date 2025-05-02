import { createSlice } from "@reduxjs/toolkit";
import { GlobalError, Post } from "../../types";
import { fetchAllPosts } from "./postsThunks.ts";
import { RootState } from "../../app/store.ts";

interface PostState {
  items: Post[] | null;
  fetchLoading: boolean;
  error: GlobalError | null;
}

const initialState: PostState = {
  items: [],
  fetchLoading: false,
  error: null,
};

export const selectAllPosts = (state: RootState) => state.posts.items;
export const selectFetchAllPostsLoading = (state: RootState) =>
  state.posts.fetchLoading;
export const selectFetchAllPostsError = (state: RootState) => state.posts.error;

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
        state.items = payload.posts;
        state.fetchLoading = false;
        state.error = null;
      })
      .addCase(fetchAllPosts.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.error = error || null;
      });
  },
});

export const postsReducer = postsSlice.reducer;
