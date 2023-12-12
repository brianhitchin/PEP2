package com.cognixia.jump.controller;

import com.cognixia.jump.exception.ManagerHasTeamException;
import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Manager;
import com.cognixia.jump.model.Team;
import com.cognixia.jump.service.ManagerService;
import com.cognixia.jump.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
@RequestMapping("/api")
public class ManagerController {

    @Autowired
    ManagerService service;

    @GetMapping("/managers")
    public ResponseEntity<?> getAllManagers() {
        return ResponseEntity.status(200).body(service.getAllManagers());
    }


    @PostMapping("/signup")
    public ResponseEntity<?> createManager(@RequestBody Manager manager){

        Manager newManager = service.createManager(manager);
        return ResponseEntity.status(201).body(newManager);

    }
}
