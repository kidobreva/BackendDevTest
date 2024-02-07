import { Request, Response, NextFunction } from 'express';
import { Post } from '../model/blog.model';

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const userId = res.locals.jwt._id;

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

    const userPosts = await Post.find({ userId });

    res.status(200).json({ posts: userPosts, count: userPosts.length });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.jwt._id;
    const postId = req.params.postId;

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

    await Post.findOneAndDelete({ userId, _id: postId });

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePost,
};
