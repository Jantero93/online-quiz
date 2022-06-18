package com.server.backend.user;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class UserDto {
  private String email;
  private String password;
}
