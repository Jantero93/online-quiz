import { UserDto } from '../model/dto/userDto';
import { User } from '../model/entity/user';

export const mapUserDtoToUser = (dto: UserDto): User => {
  const user = new User();

  user.email = dto.email;
  user.password = dto.email;

  return user;
};

export const mapUserToDto = (user: User): UserDto => {
  const dto = new UserDto();

  dto.email = user.email;

  return user;
};
