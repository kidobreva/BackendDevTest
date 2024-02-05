import { NextFunction, Request, Response } from 'express';
import { User } from '../model/user.model';
import signJWT from '../functions/signJWT';
import bcrypt from 'bcrypt';

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: 'Token validated' });
  } catch (err) {
    console.log(err);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Generate JWT token
    const token = signJWT(user);

    // let oldTokens = user.tokens || [];

    // if (oldTokens.length) {
    //   oldTokens = oldTokens.filter((t) => {
    //     const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
    //     if (timeDiff < 3600) {
    //       return t;
    //     }
    //   });
    // }

    // await User.findByIdAndUpdate(user._id, {
    //   tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
    // });

    await User.findByIdAndUpdate(user._id, {
      token: token,
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1];
  const user = req.body.user;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    // const tokens = user.tokens;
    // console.log('token', token);
    console.log('REC Body', req);
    // console.log('tokens', tokens);

    // const newTokens = tokens.filter((t) => t.token !== token);

    await User.findByIdAndUpdate(req.body._id, { token: '' });
    res.status(200).json({ message: 'Sign out successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.user;

    return res.status(200).json({ user: user, message: 'Token validated' });
  } catch (err) {
    console.log(err);
  }
};

export default { validateToken, register, login, logout, getUser };
