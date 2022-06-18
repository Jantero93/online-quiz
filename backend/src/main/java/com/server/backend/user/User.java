package com.server.backend.user;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

  @Id
  @GeneratedValue
  private Integer id;

  @Column(unique = true)
  private String email;
  private String password;
  private String createdDate;

}
