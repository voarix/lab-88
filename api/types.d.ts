export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface PostMutation {
  title: string;
  description: string | null;
  image: string | null;
  user: string;
}

export interface CommentMutation {
  user: string;
  post: string;
  text: string;
}