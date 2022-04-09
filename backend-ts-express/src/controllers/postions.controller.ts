import { allPositions } from '@/interfaces/positions.interface';
import { NextFunction, Request, Response } from 'express';

class PositionsController {
  public getPositions = (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!allPositions) {
        res.status(422).json({
          success: false,
          message: 'Positions not found',
        });
      }
      res.status(200).json({ success: true, positions: allPositions });
    } catch (error) {
      next(error);
    }
  };
}

export default PositionsController;
