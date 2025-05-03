import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import { Comment, GlobalError, ValidationError } from "../../types";
import { isAxiosError } from "axios";

export const fetchComments = createAsyncThunk<
  Comment[],
  string,
  {
    rejectValue: GlobalError;
    state: RootState;
  }
>("comments/fetchComments", async (postId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<{ comments: Comment[] }>(
      `/comments/${postId}`,
    );
    return response.data.comments;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});

export const createComment = createAsyncThunk<
  Comment,
  { text: string },
  {
    rejectValue: ValidationError | GlobalError;
    state: RootState;
  }
>("comments/createComment", async ({ text }, { getState, rejectWithValue }) => {
  try {
    const token = getState().users.user?.token;
    const postId = getState().posts.onePost?._id;

    const response = await axiosApi.post<{ comment: Comment }>(
      `/comments/${postId}`,
      { text },
      { headers: { Authorization: token } },
    );

    return response.data.comment;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
