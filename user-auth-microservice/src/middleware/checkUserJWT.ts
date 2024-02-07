import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Response, Request, NextFunction } from 'express';
import { BlackList } from '../model/blacklist-sessions.model';

const checkUserJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(' ')[1];

  try {
    const tokenExist = await BlackList.findOne({ token });

    if (!token || tokenExist) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (token) {
      jwt.verify(token, config.server.token.secret, (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: 'Unauthorized', error });
        } else {
          res.locals.jwt = decoded;
          next();
        }
      });
    }
  } catch (err) {
    console.log('Err', err);
  }
};

export default checkUserJWT;
