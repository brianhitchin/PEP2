package com.cognixia.jump.config;

import com.cognixia.jump.filter.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration {

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JwtRequestFilter jwtRequestFilter;

    // Authentication
    @Bean
    protected UserDetailsService userDetailsService(){

        return userDetailsService;
    }

    // Authorization - [PERMISSIONS]
    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http.csrf().disable()
                .authorizeRequests()

                .antMatchers(HttpMethod.GET, "/api/managers").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/teams").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/team").hasRole("MANAGER")
                .antMatchers(HttpMethod.POST, "/api/team/add").hasRole("MANAGER")
                .antMatchers(HttpMethod.GET, "/api/members").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/mymembers").hasRole("MANAGER")
                .antMatchers(HttpMethod.POST, "/api/members/add").hasRole("MANAGER")
                .antMatchers(HttpMethod.DELETE, "/api/members/*").hasRole("MANAGER")
                .antMatchers(HttpMethod.PUT, "/api/mymembers").hasRole("MANAGER")
                .antMatchers(HttpMethod.POST, "/api/signup").permitAll()
                .antMatchers("/api/authenticate").permitAll()
                .anyRequest().permitAll()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Encoder
    @Bean
    protected PasswordEncoder encoder(){

        return new BCryptPasswordEncoder();
    }

    @Bean
    protected DaoAuthenticationProvider authenticationProvider(){

        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder( encoder() );

        return authProvider;
    }

    @Bean
    protected AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }


}
