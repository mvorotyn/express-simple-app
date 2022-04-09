import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class UserService extends Repository<UserEntity> {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserEntity.find();
    return users;
  }

  public async findUsersFromOfsset(offset: number, count: number): Promise<User[]> {
    const total = await UserEntity.count();
    if (offset >= total) throw new HttpException(403, 'Invalid offset');
    const users: User[] = await UserEntity.find({ skip: offset, take: count });
    return users;
  }

  public async findUsersFromPage(page: number, count: number): Promise<User[]> {
    const pagesCount = await this.getTotalPages(count);
    if (page > pagesCount) throw new HttpException(403, 'Page not found');
    const recordsToSkip = (page - 1) * count;
    const users: User[] = await UserEntity.find({ skip: recordsToSkip, take: count });
    return users;
  }

  public async getTotalUsersNumber(): Promise<number> {
    const total = await UserEntity.count();

    return total;
  }

  public async getTotalPages(usersPerPage: number): Promise<number> {
    const total = await UserEntity.count();
    let pagesCount: number = Math.round(total / usersPerPage);
    // console.log('users controller', pagesCount, usersPerPage);
    if (pagesCount * usersPerPage < total) pagesCount++;

    return pagesCount;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'User ID is required');

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, 'User does not exist');

    return findUser;
  }

  public async getNextUrl(currentPage: number, usersPerPage: number, apiBaseUrl: string): Promise<string> {
    const totalPages = await this.getTotalPages(usersPerPage);
    if (currentPage === totalPages) {
      return null;
    } else {
      return `${apiBaseUrl}users/?page=${currentPage + 1}&count=${usersPerPage}`;
    }
  }

  public async getPrevUrl(currentPage: number, usersPerPage: number, apiBaseUrl: string): Promise<string> {
    if (currentPage < 2) {
      return null;
    } else {
      return `${apiBaseUrl}users/?page=${currentPage - 1}&count=${usersPerPage}`;
    }
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists in db`);

    const userWithPhone: User = await UserEntity.findOne({ where: { phone: userData.phone } });
    if (userWithPhone) throw new HttpException(409, `Your phone ${userData.phone} already exists in db`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save();

    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    await UserEntity.update(userId, { ...userData, password: hashedPassword });

    const updateUser: User = await UserEntity.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    await UserEntity.delete({ id: userId });
    return findUser;
  }
}

export default UserService;
