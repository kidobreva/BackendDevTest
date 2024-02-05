import { check } from 'express-validator';

const loginShema = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Email / password is required!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email / password is required!'),
];

export default loginShema;
