package com.server.backend.controller;

import com.server.backend.calendar.CalendarData;
import com.server.backend.calendar.CalendarRepository;
import com.server.backend.user.User;
import com.server.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class DemoController {

  @Autowired
  private CalendarRepository calendarRepository;

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/")
  String home() {
    return "HELLO FROM SERVER!";
  }

  @GetMapping("/moi")
  String test() {

    CalendarData c = new CalendarData();

    c.setName( "test name" );

    calendarRepository.save( c );

    return "test test";
  }

  @GetMapping("/user-test")
  String userTest() {
    User u = new User();
    u.setCreatedDate( new Date() );
    u.setAccountName( "test account" );
    u.setPasswordHash( "passwordHash" );
    userRepository.save(u);


    return "test";
  }
}
