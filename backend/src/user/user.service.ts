import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    //
  }

  async createUser(data: CreateUserDTO): Promise<UserEntity> {
    let user = new UserEntity();
    user.email = data.email;
    user.password = data.password;

    await this.userRepository.save(user);

    return user;
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
