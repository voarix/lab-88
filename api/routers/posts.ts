import express from "express";
import auth, { RequestWithUser } from "../middleware/auth";
import Post from "../models/Post";
import { PostMutation } from "../types";
import { Error } from "mongoose";
import { imagesUpload } from "../middleware/multer";

const postsRouter = express.Router();

postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find().populate("user", "username").select("-description");
    res.send({posts});
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const post = await Post.findById(id).populate("user", "username");

    if (!post) {
      res.status(404).send({error: "Post not found"});
      return;
    }

    res.send({post});
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({error: "Invalid post id"});
      return;
    }

    next(error);
  }
});

postsRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const {title, description} = req.body;

    if (!description && !req.file) {
      res.status(400).send({error: "Description or image is required"});
      return;
    }

    const newPost: PostMutation = {
      title: title,
      description: null,
      image: null,
      user: String(user._id),
    };

    if (description) {
      newPost.description = description;
    }

    if (req.file) {
      newPost.image = "posts/" + req.file.filename;
    }

    const post = new Post(newPost);
    await post.save();
    res.send({post});
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({error: error});
      return;
    }

    next(error);
  }
});

export default postsRouter;