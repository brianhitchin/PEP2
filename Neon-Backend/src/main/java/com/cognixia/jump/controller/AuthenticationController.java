package com.cognixia.jump.controller;

import com.cognixia.jump.config.AuthenticationRequest;
import com.cognixia.jump.config.AuthenticationResponse;
import com.cognixia.jump.exception.InvalidLoginException;
import com.cognixia.jump.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class AuthenticationController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JwtUtil jwtUtil;

    @Operation( summary = "Authenticate each manager with a JWT Token",
    description = "Provides the JWT token for managers who are in the neon_db database. The manager must provide their username and password in the body")
    @CrossOrigin
    @PostMapping("api/authenticate")
    public ResponseEntity<?> createJwtToken(@RequestBody AuthenticationRequest request) throws Exception {

        // try to catch the exception for bad credentials, just so we can set our own
        // message when this doesn't work
        try {
            // make sure we have a valid user by checking their username and password
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        } catch (BadCredentialsException e) {
            // provide our own message on why login didn't work
            throw new InvalidLoginException();
        }

        // as long as no exception was thrown, user is valid

        // load in the user details for that user
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        // generate the token for that user
        final String jwt = jwtUtil.generateTokens(userDetails);

        // return the token
        return ResponseEntity.status(201).body( new AuthenticationResponse(jwt));
    }
}
