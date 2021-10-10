package com.devesoft.alquilerMotos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@EntityScan(basePackages = {"com.devesoft.alquilerMotos.model"})
@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
public class AlquilerMotosApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlquilerMotosApplication.class, args);
	}

}
