import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Post id is required"],
  },
  text: {
    type: String,
    minlength: [5, "Comment must be more than 5 characters"],
    required: [true, "Text is required"],
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;