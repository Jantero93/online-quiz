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
import java.text.SimpleDateFormat;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

@RestController
public class UserController {

  final String URL = "api/user";

  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

  @Autowired
  UserService userService;

  @PostMapping(URL)
  public UserDto PostUser(@Valid @RequestBody UserDto user) {
    LOGGER.info("Post new user");
    return userService.createNewUser(user);
  }

  @PostMapping(URL + "/login")
  public HashMap<String, String> login(@Valid @RequestBody UserDto user, HttpServletResponse response) {
    LOGGER.info("Logging with email " + user.getEmail());

    String JWT = userService.login(user);

    Cookie cookie = new Cookie("token", JWT);
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    // 3 h
    cookie.setMaxAge(60 * 60 * 3);

    response.addCookie(cookie);

    String expiresTime = toThreeHoursToIsoString();
    HashMap<String, String> map = new HashMap<>();
    map.put("expires", expiresTime);
    return map;

  }

  private String toThreeHoursToIsoString() {
    return ZonedDateTime.now(ZoneOffset.UTC)
        .plusHours(3)
        .format(DateTimeFormatter.ISO_INSTANT);
  }
}
