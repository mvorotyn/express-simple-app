import { UserEntity } from '../entities/users.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from '@/interfaces/users.interface';
import { getIntFromRange } from '../utils/util';
import { hash } from 'bcrypt';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const fakeData: Partial<User>[] = [];

    const imageUrl = 'users/images/test.jpg'; //http://localhost:3000/ +
    for (let i = 0; i < 45; i++) {
      const username = faker.name.firstName();

      fakeData.push({
        name: username,
        password: await hash(faker.internet.password(), 10),
        email: faker.internet.email(username),
        phone: faker.phone.phoneNumber('+38 063 ### ## ##'),
        photo: imageUrl,
        position_id: getIntFromRange(1, 4),
      });
    }

    await connection.createQueryBuilder().insert().into(UserEntity).values(fakeData).execute();
  }
}
