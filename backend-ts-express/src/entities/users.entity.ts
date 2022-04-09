import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { positionID } from '@/interfaces/positions.interface';

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  /// NEW
  @Column()
  @IsNotEmpty()
  position_id: number;

  @Column()
  @IsNotEmpty()
  @Unique(['phone'])
  phone: string;

  // @Column({
  //   name: 'photo',
  //   type: 'bytea',
  //   nullable: false,
  // })
  // @IsNotEmpty()
  // photo: Buffer;
  @Column()
  @IsNotEmpty()
  photo: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
