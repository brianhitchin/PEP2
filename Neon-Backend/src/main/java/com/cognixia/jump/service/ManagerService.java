package com.cognixia.jump.service;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Manager;
import com.cognixia.jump.repository.ManagerRepository;
import com.cognixia.jump.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerService {

    @Autowired
    ManagerRepository repo;

    public List<Manager> getAllManagers() {
        return repo.findAll();
    }

    public Manager createManager(Manager manager){

        manager.setManagerId(null);
        return repo.save(manager);
    }
}
