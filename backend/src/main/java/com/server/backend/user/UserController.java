package com.server.backend.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@Slf4j
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/user")
    public User saveUser(@RequestBody User user) {
        log.info("Creating new user");
        return userService.saveUser(user);
    }

    @PostMapping("/role")
    public Role saveRole(@RequestBody Role role) {
        log.info("Creating new role {}", role.getName());
        return userService.saveRole(role);
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<Optional<?>> addRoleToUser(@RequestBody RoleToUserForm form) {
        log.info("Adding new role {} to user {}", form.getRoleName(), form.getUsername());
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        log.info("Refreshing token ");

        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refreshToken = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());

                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);

                String username = decodedJWT.getSubject();

                User user = userService.getUser(username);

                String accessToken = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", accessToken);
                tokens.put("refresh_token", refreshToken);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception e) {
                log.error("Refreshing token failed with message {}", e.getMessage());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", e.getMessage());

                response.setHeader("error", e.getMessage());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }

            log.error("No refresh token found");
            throw new RuntimeException("Refresh token is missing");
        }
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }
}

@Data
class RoleToUserForm {
    private String username;
    private String roleName;
}