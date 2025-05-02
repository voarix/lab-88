import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError, Post } from "../../types";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";

interface PostsResponse {
  posts: Post[];
}

export const fetchAllPosts = createAsyncThunk<
  PostsResponse,
  void,
  { rejectValue: GlobalError }
>("posts/fetchAllPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<PostsResponse>("/posts");
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});
