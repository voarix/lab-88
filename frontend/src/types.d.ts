export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface Post {
  _id: string;
  title: string;
  image: string | null;
  user: {
    _id: string;
    username: string;
  };
  datetime: string;
}

export interface PostFull {
  _id: string;
  title: string;
  image: string | null;
  user: {
    _id: string;
    username: string;
  };
  datetime: string;
  description: string | null;
}

export interface PostMutation {
  title: string;
  description?: string | null;
  image?: File | null;
}

export interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  post: string;
  text: string;
}

export interface CommentMutation {
  text: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
