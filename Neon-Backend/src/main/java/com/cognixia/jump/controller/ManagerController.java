package com.cognixia.jump.controller;

import com.cognixia.jump.exception.InvalidUpdateException;
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

    // ## ADMIN ENDPOINT ##
    @Operation(summary = "Creates an admin in the manager table",
            description = "Creates an admin in the manager table from neon_db database." +
                    "Admin must provide a name, username and password.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Manager account has been created"),
            @ApiResponse(responseCode = "400", description = "Username already exists")
    })
    @CrossOrigin
    @PostMapping("/admin")
    public ResponseEntity<?> createAdmin(@RequestBody Manager admin) throws ResourceAlreadyExistsException {

        Manager newAdmin = service.createManager(admin);
        return ResponseEntity.status(201).body(newAdmin);

    }

    @Operation(summary = "Finds a manager in the manager table by its ID",
            description = "Finds a manager in the manager table by its ID from neon_db database." +
                    "Used by admins to manage team managers")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Manager has been found"),
            @ApiResponse(responseCode = "404", description = "Manager was not found")
    })
    @CrossOrigin
    @GetMapping("/admin/manager/{id}")
    public ResponseEntity<?> getManagerById(@PathVariable Integer id, @RequestHeader(value="authorization") String header) throws ResourceNotFoundException {

        Manager manager = service.getManagerById(id);
        return ResponseEntity.status(200).body(manager);

    }

    @Operation(summary = "Updates a manager in the manager table",
            description = "Updates a manager in the manager table from neon_db database." +
                    "Used by admins to update team managers")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Manager has been updated"),
    })
    @CrossOrigin
    @PatchMapping("/admin/manager")
    public ResponseEntity<?> updateManager(@RequestBody Manager manager, @RequestHeader(value="authorization") String header) throws ResourceNotFoundException, InvalidUpdateException {

        Manager updatedManager = service.updateManager(manager, header);
        return ResponseEntity.status(200).body(updatedManager);

    }

    @Operation(summary = "Deletes a manager in the manager table",
            description = "Deletes a manager in the manager table from neon_db database." +
                    "Used by admins to delete team managers")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Manager has been deleted"),
            @ApiResponse(responseCode = "404", description = "Manager was not found")
    })
    @CrossOrigin
    @DeleteMapping("/admin/manager/{id}")
    public ResponseEntity<?> deleteManager(@PathVariable Integer id, @RequestHeader(value="authorization") String header) throws ResourceNotFoundException {

        Manager managerDeleted = service.deleteManager(id);
        return ResponseEntity.status(200).body(managerDeleted);

    }

    @Operation(summary = "Gets a manager user in the manager table by their username",
            description = "Gets a manager user in the manager table by their username from neon_db database.")
    @CrossOrigin
    @GetMapping("/managers/{username}")
    public ResponseEntity<?> getManagerByUsername(@PathVariable String username) throws ResourceNotFoundException {
        Manager manager = service.getManagerByUsername(username);
        return ResponseEntity.status(200).body(manager);
    }




}
