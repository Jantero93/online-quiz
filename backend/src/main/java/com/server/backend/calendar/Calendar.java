package com.server.backend.calendar;

import com.server.backend.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "calendar")
@Data
public class Calendar {

  @Id
  @GeneratedValue
  private Integer id;

  private String Date;

  private Double weight;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

}
