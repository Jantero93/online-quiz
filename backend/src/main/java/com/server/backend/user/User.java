package com.server.backend.user;

import com.server.backend.calendar.Calendar;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "email")
})
@Data
public class User {

  @Id
  @GeneratedValue
  private Integer id;

  private String email;

  private String password;

  private String createdDate;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private List<Calendar> calendarList;

}
