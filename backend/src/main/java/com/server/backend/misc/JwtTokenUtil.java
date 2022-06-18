package com.server.backend.misc;

import org.springframework.stereotype.Component;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;


@Component
public class JwtTokenUtil implements Serializable {

  public static final long serialVersionUID = -2550185165626007488L;
  public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

  @Value("${jwt.secret}")
  private String secret;


}
