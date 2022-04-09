import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser, DataStoredInRandomToken } from '@interfaces/auth.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      // const { id } = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      // const findUser = await UserEntity.findOne(id, { select: ['id', 'email', 'password'] });

      // if (findUser) {
      //   req.user = findUser;
      //   next();
      const { number } = (await jwt.verify(Authorization, secretKey)) as DataStoredInRandomToken;
      // console.log(number, 'decoded from token');
      if (number) {
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
