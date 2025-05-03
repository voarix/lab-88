import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GlobalError,
  Post,
  PostFull,
  PostMutation,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { RootState } from "../../app/store.ts";

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

export const addNewPost = createAsyncThunk<
  Post,
  PostMutation,
  { rejectValue: ValidationError | GlobalError; state: RootState }
>("posts/addNewPost", async (postForm, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    const formData = new FormData();
    const keys = Object.keys(postForm) as (keyof PostMutation)[];

    keys.forEach((key) => {
      const value = postForm[key] as string;
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.post("/posts", formData, {
      headers: {
        Authorization: token,
      },
    });

    return response.data.post;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const fetchOnePost = createAsyncThunk<
  PostFull,
  string,
  { rejectValue: GlobalError }
>("posts/fetchOnePost", async (postId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get(`/posts/${postId}`);
    return response.data.post;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
