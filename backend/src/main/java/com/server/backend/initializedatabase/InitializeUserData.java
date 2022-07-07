package com.server.backend.initializedatabase;

import com.server.backend.user.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class InitializeUserData {

    @Value("${REBUILD_DATABASE}")
    private String REBUILD_DATABASE;


    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    public CommandLineRunner initUsersOnStart(
            UserRepository userRepository,
            RoleRepository roleRepository,
            UserService userService
    ) {
        return args -> {
            if (REBUILD_DATABASE.equals("true")) {
                userRepository.deleteAll();
                roleRepository.deleteAll();

                initRoles(roleRepository);
                initUsers(userRepository);
                initRolesToUsers(userService);
            }
        };
    }

    private void initRoles(RoleRepository roleRepository) {
        Role normalRole = new Role();
        normalRole.setName(RoleEnum.NORMAL.name());
        roleRepository.save(normalRole);

        Role adminRole = new Role();
        adminRole.setName(RoleEnum.ADMIN.name());
        roleRepository.save(adminRole);
    }

    private void initUsers(UserRepository userRepository) {
        User normalUser = new User();
        normalUser.setUsername("user");
        normalUser.setPassword(bCryptPasswordEncoder.encode("user"));
        userRepository.save(normalUser);

        User adminUser = new User();
        adminUser.setUsername("admin");
        adminUser.setPassword(bCryptPasswordEncoder.encode("admin"));
        userRepository.save(adminUser);
    }

    private void initRolesToUsers(UserService userService) {
        userService.addRoleToUser("user", RoleEnum.NORMAL.name());
        userService.addRoleToUser("admin", RoleEnum.NORMAL.name());
        userService.addRoleToUser("admin", RoleEnum.ADMIN.name());
    }
}
