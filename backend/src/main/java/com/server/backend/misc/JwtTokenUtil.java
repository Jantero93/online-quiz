package com.server.backend.misc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.server.backend.calendar.Calendar;
import com.server.backend.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import net.minidev.json.JSONObject;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;

import javax.crypto.spec.SecretKeySpec;


@Component
public class JwtTokenUtil {

  @Value("${jwt.secret}")
  private String secret;

  public String generateJWT(Integer userId, String email) {
    Date now = new Date();
    Date plusThreeHours = new Date(now.getTime() + TimeUnit.HOURS.toMillis(3));

    return Jwts.builder()
        .claim("userEmail", email)
        .claim("userId", userId)
        .setId(secret)
        .setIssuedAt(now)
        .setExpiration(plusThreeHours)
        .compact();
  }

  public User getUserFromJwt(@Nullable String jwtString) throws JsonProcessingException {
    if (jwtString == null) return null;

    String[] chunks = jwtString.split("\\.");
    Base64.Decoder decoder = Base64.getUrlDecoder();
    String payload = new String(decoder.decode(chunks[1]));

    final ObjectNode node = new ObjectMapper().readValue(payload, ObjectNode.class);

    if (!node.has("userEmail")) return null;
    if (!node.has("userId")) return null;

    User u = new User();
    u.setEmail(node.get("userEmail").toString());
    u.setId(Integer.parseInt(node.get("userId").toString()));
    return u;
  }
}
