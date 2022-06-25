import AppDataSource from '../config/db/DataSource';

import { User } from '../model/entity/user';
import { UserDto } from './../model/dto/userDto';

import * as userMapper from '../mapper/user';
import logger from '../utility/logger';

const userRepository = AppDataSource.getRepository(User);

class UserService {
  static async postUser(userDto: UserDto) {
    logger.info(`Saving user to DB with %O`, userDto.email);

    const user = userMapper.mapUserDtoToUser(userDto);
    return await userRepository.save(user);
  }
}

export default UserService;
