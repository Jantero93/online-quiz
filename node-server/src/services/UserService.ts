import { UserDto } from './../model/dto/userDto';
class UserService {
  static postUser(userDto: UserDto) {
    console.log('userDto', userDto);
    return;
  }
}

export default UserService;
