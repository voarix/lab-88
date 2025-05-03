import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { Comment, GlobalError, ValidationError } from "../../types";
import { createComment, fetchComments } from "./commentsThunks.ts";

interface CommentsState {
  items: Comment[];
  fetchLoading: boolean;
  fetchError: GlobalError | ValidationError | null;
  createLoading: boolean;
  createError: GlobalError | ValidationError | null;
}

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoading = (state: RootState) =>
  state.comments.fetchLoading;
export const selectCommentsError = (state: RootState) =>
  state.comments.fetchError;
export const selectCommentCreating = (state: RootState) =>
  state.comments.createLoading;
export const selectCommentCreateError = (state: RootState) =>
  state.comments.createError;

const initialState: CommentsState = {
  items: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
        state.items = comments.slice().reverse();
        state.fetchLoading = false;
      })
      .addCase(fetchComments.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.fetchError = error || null;
      })

      .addCase(createComment.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.createLoading = false;
        state.createError = null;
      })
      .addCase(createComment.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        state.createError = error || null;
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
