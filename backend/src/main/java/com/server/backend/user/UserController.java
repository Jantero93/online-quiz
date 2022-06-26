package com.server.backend.user;

import com.fasterxml.jackson.core.JsonProcessingException;
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
  public HashMap<String, Object> login(@Valid @RequestBody UserDto user, HttpServletResponse response) throws JsonProcessingException {
    LOGGER.info("Logging with email " + user.getEmail());

    HashMap<String, Object> map = userService.login(user);

    Cookie cookie = new Cookie("token", (String) map.get("JWT"));
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    // 3 h
    cookie.setMaxAge(60 * 60 * 3);
    response.addCookie(cookie);

    UserDto responseUser = (UserDto) map.get("user");

    String expiresTime = toThreeHoursToIsoString();
    HashMap<String, Object> responseMap = new HashMap<>();
    responseMap.put("expires", expiresTime);
    responseMap.put("user", responseUser);
    return responseMap;

  }

  private String toThreeHoursToIsoString() {
    return ZonedDateTime.now(ZoneOffset.UTC)
        .plusHours(3)
        .format(DateTimeFormatter.ISO_INSTANT);
  }
}
