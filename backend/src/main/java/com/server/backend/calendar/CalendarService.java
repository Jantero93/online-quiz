package com.server.backend.calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarService {

  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

  @Autowired
  CalendarRepository calendarRepository;

  List<Calendar> getAll() {
    LOGGER.info("Get all calendar from DB");
    return calendarRepository.findAll();
  }
}
