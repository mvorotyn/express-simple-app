import { Router } from 'express';
import PositionsController from '@/controllers/postions.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class PositionsRoute implements Routes {
  public path = '/';
  public router = Router();
  public postionsController = new PositionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}positions`, this.postionsController.getPositions);
  }
}

export default PositionsRoute;
