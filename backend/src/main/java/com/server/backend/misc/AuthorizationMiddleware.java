package com.server.backend.misc;

import com.server.backend.misc.JwtTokenUtil;
import com.server.backend.user.User;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Component
public class AuthorizationMiddleware extends OncePerRequestFilter {

  final String cookieName = "token";

  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

  @Autowired
  JwtTokenUtil jwtTokenUtil;

  @Override
  protected void doFilterInternal(
      @NotNull HttpServletRequest request,
      @NotNull HttpServletResponse response,
      @NotNull FilterChain filterChain
  ) throws ServletException, IOException {
    LOGGER.info("Authorization middleware");

    if (request.getCookies() == null) {
      LOGGER.info("No jwt cookie found on cookies");
      filterChain.doFilter(request, response);
      return;
    }

    String jwt = Arrays.stream(request.getCookies())
        .filter(c -> c.getName().equals(cookieName))
        .findFirst()
        .map(Cookie::getValue)
        .orElse(null);

    request.setAttribute("user", jwtTokenUtil.getUserFromJwt(jwt));

    LOGGER.info("Exiting authorization user " + request.getAttribute("user").toString());
    filterChain.doFilter(request, response);
  }
}
