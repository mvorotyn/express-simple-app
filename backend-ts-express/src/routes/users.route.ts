import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { UsersParams } from './validation/users.route.validation';
import authMiddleware from '@/middlewares/auth.middleware';

const imageFilesForValidation = [{ imagename: 'photo', type: 'jpg', minWidth: 70, minHeight: 70, maxFileSize: 5 }];

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, validationMiddleware(UsersParams, 'query', true), this.usersController.getUsers);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateUserDto, 'body', false, true, true, imageFilesForValidation),
      this.usersController.createUser,
    );
    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
  }
}

export default UsersRoute;
