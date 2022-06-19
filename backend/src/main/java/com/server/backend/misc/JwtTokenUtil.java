package com.server.backend.misc;

import com.server.backend.calendar.Calendar;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;


@Component
public class JwtTokenUtil {

  @Value("${jwt.secret}")
  private String secret;

  public String generateJWT(String email) {
    Date now = new Date();
    Date nowPlusHour = new Date(now.getTime() + TimeUnit.HOURS.toMillis(1));

    return Jwts.builder()
        .claim("email", email)
        .setId(secret)
        .setIssuedAt(now)
        .setExpiration(nowPlusHour)
        .compact();
  }
}
