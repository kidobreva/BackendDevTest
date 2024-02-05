import jwt from 'jsonwebtoken';
import config from '../config/config';
import { IUser } from '../model/user.model';

const signJWT = (user: IUser) => {
  try {
    return jwt.sign(
      { _id: user._id, email: user.email },
      config.server.token.secret,
      { expiresIn: config.server.token.expireTime }
    );
  } catch (err) {
    console.log(err);
  }
};

export default signJWT;
