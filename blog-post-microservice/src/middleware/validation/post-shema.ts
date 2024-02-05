import { check } from 'express-validator';

const postShema = [
  check('title').trim().not().isEmpty().withMessage('Title is required!'),
  check('content').trim().not().isEmpty().withMessage('Content is required!'),
];

export default postShema;
