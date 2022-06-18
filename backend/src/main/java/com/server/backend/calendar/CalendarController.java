package com.server.backend.calendar;

import com.server.backend.BackendApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CalendarController {

  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

  @Autowired
  CalendarService calendarService;

  @GetMapping("/calendar")
  List<Calendar> GetAllCalendar() {
    LOGGER.info("Get all Calendar /calendar");
    return calendarService.getAll();
  }
}
