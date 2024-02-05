import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import { Response, Request, NextFunction } from 'express';
import { User } from '../model/user.model';

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1];
  console.log('Token isAuth', token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decode = jwt.verify(token, config.server.token.secret) as JwtPayload;
    const user = await User.findById(decode._id);

    if (!user?.token) {
      return res.json({ success: false, message: 'unauthorized access!' });
    }

    if (!user) {
      return res.json({ success: false, message: 'unauthorized access!' });
    }
    // console.log('In Auth REQ', req);
    req.body.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default isAuth;
