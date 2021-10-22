package com.devesoft.alquilerMotos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan(basePackages = {"com.devesoft.alquilerMotos.model"})
@SpringBootApplication
public class AlquilerMotosApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlquilerMotosApplication.class, args);
	}

}
