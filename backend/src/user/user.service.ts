import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoleEntity } from '../entities/role.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity) // я не стал создавать отдельный сервис для ролей, т.к. используется только тут
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {
    //
  }

  async createManager(data: CreateUserDTO): Promise<UserEntity> {
    let user = new UserEntity();
    user.email = data.email;
    user.password = data.password;
    user.role = await this.rolesRepository.findOneOrFail({ name: 'manager' });

    await this.userRepository.save(user);

    return user;
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['role'] }); // TODO: remove relations
  }
}
