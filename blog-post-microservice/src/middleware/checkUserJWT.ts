import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import axios from 'axios';
import { Response, Request, NextFunction } from 'express';

const checkUserJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(' ')[1];

  try {
    await axios.get(config.authServicePath, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (token) {
      const decoded = jwt.verify(
        token,
        config.server.token.secret
      ) as JwtPayload;
      res.locals.jwt = decoded;
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default checkUserJWT;
