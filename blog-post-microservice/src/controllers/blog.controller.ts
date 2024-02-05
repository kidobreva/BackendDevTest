import { Request, Response, NextFunction } from 'express';
import { User } from '../../../user-auth-microservice/src/model/user.model';
import { Post } from '../model/blog.model';
import mongoose from 'mongoose';

const getPostsTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('Testttt');
    return res.status(200).json({ message: 'Token validated' });
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const userId = res.locals.jwt._id;

    // Check if the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new post associated with the user
    const post = new Post({ title, content, userId });

    // Save the post
    await post.save();

    res.status(200).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.jwt._id;

    console.log('test In');
    // Check if the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found not found' });
    }

    const userPosts = await Post.find({ userId });
    // await Post.find({ userId })
    //   .then((res) => console.log('RESSS', res))
    //   .catch((err) => console.log('Err', err));

    res.status(200).json({ posts: userPosts, count: userPosts.length });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Errorrrrr' });
  }
};

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.jwt._id;
    const postId = req.params.postId;

    // Check if the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const post = await Post.findOne({ userId, _id: postId });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updatePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.jwt._id;
    const postId = req.params.postId;

    // Check if the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const post = await Post.findOneAndUpdate(
      { userId, _id: postId },
      req.body,
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.jwt._id;
    const postId = req.params.postId;

    // Check if the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await Post.findOneAndDelete({ userId, _id: postId });

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  getPostsTest,
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePost,
};
