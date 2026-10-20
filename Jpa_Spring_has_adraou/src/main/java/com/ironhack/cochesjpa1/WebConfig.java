package com.ironhack.cochesjpa1;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/login")
                .allowedOriginPatterns("*")
                .allowedMethods("POST", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

        registry.addMapping("/logout")
                .allowedOriginPatterns("*")
                .allowedMethods("POST", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
