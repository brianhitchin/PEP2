package com.cognixia.jump;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(
        info = @Info(
                title = "Neon API",
                version = "1.0",
                description = "API that allows team managers to manage their teams.")
        )
@SpringBootApplication
public class NeonBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(NeonBackendApplication.class, args);
    }

}
