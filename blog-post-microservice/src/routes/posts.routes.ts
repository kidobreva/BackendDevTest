import express from 'express';
import controller from '../controllers/blog.controller';
import checkUserJWT from '../middleware/checkUserJWT';
import postShema from '../middleware/validation/post-shema';
import { validateRequestSchema } from '../middleware/validation/validate-request-shema';

const router = express.Router();

router.get('/get', checkUserJWT, controller.getPostsTest);
router.post(
  '/post',
  checkUserJWT,
  postShema,
  validateRequestSchema,
  controller.createPost
);
router.get('/posts', checkUserJWT, controller.getPosts);
router.get('/posts/:postId', checkUserJWT, controller.getPostById);
router.put('/posts/:postId', checkUserJWT, controller.updatePostById);
router.delete('/posts/:postId', checkUserJWT, controller.deletePost);

export default router;
