import { check } from 'express-validator';

const registerSchema = [
  check('firstName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('FirstName is required!')
    .isLength({ min: 3, max: 20 })
    .withMessage('FirstName must be 3 to 20 characters!'),
  check('lastName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('LastName is required!')
    .isLength({ min: 3, max: 20 })
    .withMessage('LastName must be 3 to 20 characters!'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Email must contain a valid email address'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be 3 to 20 characters long!'),
];

export default registerSchema;
