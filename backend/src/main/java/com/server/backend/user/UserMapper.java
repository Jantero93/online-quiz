package com.server.backend.user;

public final class UserMapper {

  public static UserDto UserToDto(User user) {
    UserDto u = new UserDto();
    u.setEmail(user.getEmail());
    return u;
  }

  public static User DtoToUser(UserDto userDto) {
    User u = new User();
    u.setEmail(userDto.getEmail());
    u.setPassword(userDto.getPassword());
    return u;
  }
}
