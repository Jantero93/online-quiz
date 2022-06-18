package com.server.backend.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {

  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

  @Autowired
  UserService userService;

  @PostMapping("/user")
  UserDto PostUser(@RequestBody UserDto user) {
    LOGGER.info("Post new user");
    UserDto userFromDb = userService.createNewUser(user);

    if (userFromDb == null) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already taken");
    }

    return userFromDb;
  }
}
