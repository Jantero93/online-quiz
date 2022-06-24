package com.server.backend.user;

import com.server.backend.calendar.Calendar;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Data
public class UserDto implements Serializable {

  @NotEmpty
  @Email
  private String email;

  @Size(min = 6, max = 30)
  private String password;

  List<Calendar> calendarList;
}
