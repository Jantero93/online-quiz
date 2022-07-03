package com.server.backend;

import com.server.backend.user.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class BackendApplicationTests {

	@Autowired
	UserController userController;

	@Test
	void userControllerContextLoad() throws Exception {
		assertThat(userController).isNotNull();
	}

}
