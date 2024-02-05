import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Response, Request, NextFunction } from 'express';

const checkUserJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        return res.status(404).json({ message: error.message, error });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  }
};

export default checkUserJWT;
