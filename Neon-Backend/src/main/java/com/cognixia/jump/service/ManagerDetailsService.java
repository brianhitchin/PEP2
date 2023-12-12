package com.cognixia.jump.service;

import com.cognixia.jump.model.Manager;
import com.cognixia.jump.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ManagerDetailsService implements UserDetailsService {

    @Autowired
    ManagerRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Manager> managerFound = repo.findByUsername(username);

        if(managerFound.isEmpty()){
            throw new UsernameNotFoundException(username);
        }

        return new ManagerDetails(managerFound.get());
    }
}
