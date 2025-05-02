import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    minlength: [5, "Title must be more than 5 characters"],
    required: [true, "Title is required"],
  },
  description: String,
  image: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  datetime: {
    type: Date,
    default: Date.now,
  }
});

const Post = mongoose.model("Post", PostSchema);
export default Post;