import { Body, JsonController, Post } from 'routing-controllers';
import { UserDto } from '../model/dto/userDto';

import UserService from '../services/UserService';
import logger from '../utility/logger';

@JsonController()
class UserController {
  @Post('/user')
  post(@Body({ validate: true }) user: UserDto) {
    logger.info('Controller: Creating new user');

    const savedUser = UserService.postUser(user);
    return savedUser;
  }
}

export default UserController;
