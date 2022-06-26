package com.server.backend.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.backend.misc.BCryptUtil;
import com.server.backend.misc.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.Cookie;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;

@Service
public class UserService {

  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

  @Autowired
  UserRepository userRepository;

  @Autowired
  BCryptUtil bCryptUtil;

  @Autowired
  JwtTokenUtil jwtTokenUtil;

  public UserDto createNewUser(UserDto userDto) {
    LOGGER.info("Creating new user to DB");
    User user = UserMapper.DtoToUser(userDto);

    User userDb = userRepository.findByEmail(user.getEmail());

    if (userDb != null) {
      LOGGER.warn("User with email " + userDb.getEmail() + " exist already");
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "User with email " + userDb.getEmail() + " exists already"
      );
    }

    String passwordHash = bCryptUtil.hashPw(user.getPassword());

    user.setPassword(passwordHash);
    user.setCreatedDate(ZonedDateTime
        .now(ZoneOffset.UTC)
        .format(DateTimeFormatter.ISO_INSTANT));

    User savedUser = userRepository.save(user);
    return UserMapper.UserToDto(savedUser);
  }

  public HashMap<String, Object> login(UserDto userDto) throws JsonProcessingException {
    LOGGER.info("Logging user with email " + userDto.getEmail());
    User user = UserMapper.DtoToUser(userDto);

    User userDb = userRepository.findByEmail(user.getEmail());

    if (userDb == null) {
      LOGGER.warn("No found user with email " + user.getEmail());
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "No user found with email " + user.getEmail()
      );
    }

    boolean pwMatch = bCryptUtil.passwordMatch(user.getPassword(), userDb.getPassword());

    if (!pwMatch) {
      LOGGER.warn("Login failed, password did not match");
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Password do not match");
    }

    UserDto newDto = UserMapper.UserToDto(userDb);
    String JWT = jwtTokenUtil.generateJWT(userDb.getId(), userDb.getEmail());

    HashMap<String, Object> map = new HashMap<>();
    map.put("JWT", JWT);
    map.put("user", newDto);
    return map;
  }
}
