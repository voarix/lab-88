import express from "express";
import Comment from "../models/Comment";
import auth, { RequestWithUser } from "../middleware/auth";
import { CommentMutation } from "../types";
import { Error } from "mongoose";

const commentsRouter = express.Router();

commentsRouter.get("/:post_id", async (req, res, next) => {
  try {
    const postId = req.params.post_id;

    const comments = await Comment.find({post: postId}).populate("user", "username");
    res.send({comments});
  } catch (error) {
    next(error);
  }
});

commentsRouter.post("/:post_id", auth, async (req, res, next) => {
  try {
    const postId = req.params.post_id;
    const user = (req as RequestWithUser).user;

    const newComment: CommentMutation = {
      user: String(user._id),
      post: postId,
      text: req.body.text,
    };

    const comment = new Comment(newComment);
    await comment.save();
    await comment.populate("user", "username");
    res.send({comment});
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({error: error});
      return;
    }

    next(error);
  }
});

export default commentsRouter;