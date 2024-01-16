package com.cognixia.jump.controller;

import com.cognixia.jump.exception.ManagerHasTeamException;
import com.cognixia.jump.exception.ResourceAlreadyExistsException;
import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Manager;
import com.cognixia.jump.model.Team;
import com.cognixia.jump.service.ManagerService;
import com.cognixia.jump.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Manager", description = "The API for managing manager accounts")
@RestController
@CrossOrigin
@RequestMapping("/api")
public class ManagerController {

    @Autowired
    ManagerService service;

    @Operation(summary = "Get all managers in the manager table",
    description = "Gets all managers in the manager table from neon_db database.")
    @CrossOrigin
    @GetMapping("admin/managers")
    public ResponseEntity<?> getAllManagers() {
        return ResponseEntity.status(200).body(service.getAllManagers());
    }

    @Operation(summary = "Creates a manager in the manager table",
            description = "Creates a manager in the manager table from neon_db database." +
                          "User must provide a name, username and password.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Manager account has been created"),
            @ApiResponse(responseCode = "400", description = "Username already exists")
    })
    @CrossOrigin
    @PostMapping("/signup")
    public ResponseEntity<?> createManager(@RequestBody Manager manager) throws ResourceAlreadyExistsException {

        Manager newManager = service.createManager(manager);
        return ResponseEntity.status(201).body(newManager);

    }

    // ## ADMIN LOGIN
//    @Operation(summary = "Creates an admin in the manager table",
//            description = "Creates an admin in the manager table from neon_db database." +
//                    "Admin must provide a name, username and password.")
//    @ApiResponses({
//            @ApiResponse(responseCode = "201", description = "Manager account has been created"),
//            @ApiResponse(responseCode = "400", description = "Username already exists")
//    })
//    @CrossOrigin
//    @PostMapping("/signup")
//    public ResponseEntity<?> createManager(@RequestBody Manager manager) throws ResourceAlreadyExistsException {
//
//        Manager newManager = service.createManager(manager);
//        return ResponseEntity.status(201).body(newManager);
//
//    }
}
