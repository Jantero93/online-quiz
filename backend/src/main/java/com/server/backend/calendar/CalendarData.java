package com.server.backend.calendar;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "calendar")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarData {

  @Id
  @GeneratedValue
  private Integer id;

  private String name;

}
