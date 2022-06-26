package com.server.backend.misc;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Component
public class BCryptUtil {

    public String hashPw(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt(10));
    }

    public boolean passwordMatch(String password, String hash) {
        return BCrypt.checkpw(password, hash);
    }
}
