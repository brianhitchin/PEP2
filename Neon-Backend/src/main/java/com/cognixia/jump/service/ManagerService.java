package com.cognixia.jump.service;

import com.cognixia.jump.exception.ResourceAlreadyExistsException;
import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Manager;
import com.cognixia.jump.repository.ManagerRepository;
import com.cognixia.jump.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ManagerService {

    @Autowired
    ManagerRepository repo;

    @Autowired
    PasswordEncoder encoder;

    public List<Manager> getAllManagers() {
        return repo.findAll();
    }

    public Manager createManager(Manager manager) throws ResourceAlreadyExistsException {

        // Ensure that manager does not already exist
        if(repo.findByUsername(manager.getUsername()).isPresent())
            throw new ResourceAlreadyExistsException("Username");

        manager.setManagerId(null);
        manager.setPassword(encoder.encode(manager.getPassword()));
        return repo.save(manager);
    }

    public Manager getManagerById(Integer id) throws ResourceNotFoundException {

        Optional<Manager> managerFound = repo.findById(id);

        if(managerFound.isPresent()){
            return managerFound.get();
        }
        else{
            throw new ResourceNotFoundException("Manager");
        }
    }

    public Manager updateManager(Manager manager) {

        return repo.save(manager);
    }

    public Manager deleteManager(Integer id) throws ResourceNotFoundException {

        Manager toDelete = getManagerById(id);
        repo.delete(toDelete);
        return toDelete;
    }

    public Manager getManagerByUsername(String username) throws ResourceNotFoundException {

        Optional<Manager> manager = repo.findByUsername(username);

        if(manager.isPresent())
            return manager.get();
        else
            throw new ResourceNotFoundException("Manager");
    }
}
