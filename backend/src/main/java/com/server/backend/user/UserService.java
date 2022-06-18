package com.server.backend.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
public class UserService {

  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

  @Autowired
  UserRepository userRepository;

  UserDto createNewUser(UserDto userDto) {
    LOGGER.info("Creating new user to DB");

    User user = UserMapper.DtoToUser(userDto);

    User userDb = userRepository.findByEmail(user.getEmail());

    if (userDb != null) {
      LOGGER.info("User with email " + userDb.getEmail() + " exist already");
      return null;
    }

    user.setCreatedDate(Instant.now().toString());
    User savedUser = userRepository.save(user);

    return UserMapper.UserToDto(savedUser);
  }
}
