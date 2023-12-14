package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.exception.ManagerHasTeamException;
import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Team;
import com.cognixia.jump.repository.TeamRepository;
import com.cognixia.jump.service.TeamService;

@Tag(name = "Team", description = "The API for managing teams")
@CrossOrigin
@RestController
@RequestMapping("/api")
public class TeamController {

	@Autowired
	TeamService service;

	@Operation(summary = "Get all teams in the team table",
			description = "Get all teams in the team table from the neon_db database.")
	@CrossOrigin
	@GetMapping("/teams")
	public List<Team> getAllTeams() {
		return service.getAllTeams();		
	}

	@Operation(summary = "Get the team of the current manager",
			description = "Get the team of the manager that is currently logged in. " +
					"The manager must be logged in using a JWT token to access their team.")
	@ApiResponses(
			@ApiResponse(responseCode = "200",
					description = "Team has been found")
	)
	@CrossOrigin
	@GetMapping("/team")
	public ResponseEntity<?> getTeam(@RequestHeader(value="authorization") String header ) {
		
		Team myTeam = service.getMyTeam(header);
		return ResponseEntity.status(200).body(myTeam);
		
	}

	@Operation(summary = "Add a team to the current manager",
			description = "Add a team to the manager that is currently logged in. " +
					"The manager must be logged in using a JWT token to create their team.")
	@ApiResponses(
			@ApiResponse(responseCode = "201",
					description = "Team has been created")
	)
	@CrossOrigin
	@PostMapping("/team/add")
	public ResponseEntity<?> addTeam(@RequestHeader(value="authorization") String header, @RequestBody Team newTeam) throws ResourceNotFoundException, ManagerHasTeamException {

		Team createdTeam = service.addTeam(header, newTeam);
		return ResponseEntity.status(201).body(createdTeam);

	}

}
