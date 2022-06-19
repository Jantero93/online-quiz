package com.server.backend.user;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class UserDto {

  @NotEmpty
  @Email
  private String email;

  @Size(min = 6, max = 30)
  private String password;
}
