import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";
import { randomUUID } from "node:crypto";


const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('posts');
    await db.dropCollection('comments');
  } catch (error) {
    console.log('Collections were not present, skipping drop');
  }

  const [user1, user2] = await User.create(
    {
      username: "user1",
      password: 123,
      token: randomUUID(),
    },
    {
      username: "user2",
      password: 123,
      token: randomUUID(),
    }
  );

  const [post1, post2] = await Post.create(
    {
      user: user1._id,
      title: "Title1",
      description: "Description1",
      image: null,
      datetime: new Date(),
    },
    {
      user: user2._id,
      title: "Titl2",
      description: "BlaBLaBLaBla",
      image: null,
      datetime: new Date(),
    }
  );

  await Comment.create(
    {
      post: post1._id,
      user: user1._id,
      text: "Comment 1 on Post 1 by User 1",
      datetime: new Date(new Date().getTime() - 5000),
    },
    {
      post: post1._id,
      user: user2._id,
      text: "Comment 2 on Post 1 by User 2",
      datetime: new Date(new Date().getTime() - 3000),
    },
    {
      post: post2._id,
      user: user1._id,
      text: "Comment 1 on Post 2 by User 1",
      datetime: new Date(new Date().getTime() - 4000),
    },
    {
      post: post2._id,
      user: user2._id,
      text: "Comment 2 on Post 2 by User 2",
      datetime: new Date(new Date().getTime() - 1000),
    }
  );
  await db.close();
};

run().catch(console.error);