import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { FinalUser, User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { PositionsMap, positionID, PositionsSimpleRegistry, positionName } from '@/interfaces/positions.interface';
import { PORT } from '@/config';

interface IUsersResponse {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: string | null;
    prev_url: string | null;
  };
  users: Partial<FinalUser>[];
}

// let responseObject = {
//   success: true,
//   page: 1,
//   total_pages: 10,
//   total_users: 47,
//   count: 5,
//   links: {
//     next_url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=2&count=5',
//     prev_url: null,
//   },
//   users: data,
// };

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const usersResponse: Partial<IUsersResponse> = {};
    const apiBaseUrl = `${req.protocol}://${req.hostname}:${PORT}/api/v1/`;
    try {
      usersResponse.success = true;
      const { page, offset, count } = req.query;
      let numberOfUsers = 5;
      let currentPage = 1;
      const parsedOffset = parseInt(offset as string);
      if (parseInt(page as string) > 0) currentPage = parseInt(page as string);
      if (parseInt(count as string) > 0 && parseInt(count as string) < 101) numberOfUsers = parseInt(count as string);
      let data: Partial<FinalUser>[];

      if (parsedOffset > -1) {
        const usersFromOffsetData: User[] = await this.userService.findUsersFromOfsset(parsedOffset, numberOfUsers);
        data = usersFromOffsetData;
        // console.log('findFromOffset');
      } else {
        usersResponse.total_pages = await this.userService.getTotalPages(numberOfUsers);
        const usersFromPageData: User[] = await this.userService.findUsersFromPage(currentPage, numberOfUsers);
        data = usersFromPageData;
        usersResponse.page = currentPage;
        const next = await this.userService.getNextUrl(currentPage, numberOfUsers, apiBaseUrl);
        const prev = await this.userService.getPrevUrl(currentPage, numberOfUsers, apiBaseUrl);
        usersResponse.links = { next_url: next, prev_url: prev };
        // console.log('findFromPage');
      }

      usersResponse.total_users = await this.userService.getTotalUsersNumber();
      usersResponse.count = data.length;

      for (let index = 0; index < data.length; index++) {
        const user = data[index];
        user.position = PositionsSimpleRegistry[user.position_id] as positionName;
        user.photo = apiBaseUrl + user.photo;
      }

      usersResponse.users = data;

      res.status(200).json(usersResponse);

      // console.log(page, offset, count);
      // const findAllUsersData: User[] = await this.userService.findAllUser();

      // res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const apiBaseUrl = `${req.protocol}://${req.hostname}:${PORT}/api/v1/`;
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.userService.findUserById(userId);
      const transformedUserData: Partial<FinalUser> = {};
      transformedUserData.name = findOneUserData.name;
      transformedUserData.email = findOneUserData.email;
      transformedUserData.position_id = findOneUserData.position_id;
      transformedUserData.position = PositionsSimpleRegistry[findOneUserData.position_id] as positionName;
      transformedUserData.phone = findOneUserData.phone;
      transformedUserData.photo = apiBaseUrl + findOneUserData.photo;

      res.status(200).json({ success: true, data: transformedUserData });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({
        success: true,
        user_id: createUserData.id,
        message: 'New user successfully registered',
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
