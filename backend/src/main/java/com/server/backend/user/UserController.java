package com.server.backend.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
public class UserController {

  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

  @Autowired
  UserService userService;

  @PostMapping("/user")
  UserDto PostUser(@Valid @RequestBody UserDto user) {
    LOGGER.info("Post new user");
    UserDto userFromDb = userService.createNewUser(user);

    if (userFromDb == null) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already taken");
    }

    return userFromDb;
  }

  @PostMapping("/user/login")
  String login(@Valid @RequestBody UserDto user, HttpServletResponse response) {
    Cookie cookie = userService.login(user);

    if (cookie != null) {
      response.addCookie(cookie);
      return "Successfully logged";
    }

    return "Login failed";
  }
}
