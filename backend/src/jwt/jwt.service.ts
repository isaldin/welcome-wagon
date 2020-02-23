import { compare as bcryptCompare } from 'bcrypt';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../user/user.entity';
import { LoginDTO } from './dto/login.dto';
import { generateTokenForEmail } from './helpers/generateToken';
import { isTokenValid } from './helpers/isTokenValid';
import { JwtEntity } from './jwt.entity';

@Injectable()
export class JwtService {
  constructor(
    @InjectRepository(JwtEntity)
    private readonly jwtRepository: Repository<JwtEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    //
  }

  async getTokenForUserWithCredentials(credentials: LoginDTO): Promise<string> {
    const user = await this.userRepository.findOne({
      email: credentials.email,
    });
    if (!user) {
      // TODO: unify it
      throw new Error('Email not found');
    }

    const isPasswordMatched = await bcryptCompare(
      credentials.password,
      user.password,
    );
    if (!isPasswordMatched) {
      // TODO: unify it
      throw new Error('Invalid password');
    }

    const jwt = await this.jwtRepository.findOne(
      { user },
      { relations: ['user'] },
    );
    if (jwt) {
      if (isTokenValid(jwt.token)) {
        return jwt.token;
      } else {
        await this.jwtRepository.remove(jwt);
      }
    }

    const token = await generateTokenForEmail(user.email);
    const jwtEntity = new JwtEntity();
    jwtEntity.token = token;
    jwtEntity.user = user;
    const saveJwt = await this.jwtRepository.save(jwtEntity);

    return saveJwt.token;
  }

  async getUserWithJwt(jwt: string): Promise<UserEntity | null> {
    const jwtEntity = await this.jwtRepository.findOne({ token: jwt });
    if (jwtEntity && isTokenValid(jwtEntity.token)) {
      return jwtEntity.user;
    }
    return null;
  }
}
