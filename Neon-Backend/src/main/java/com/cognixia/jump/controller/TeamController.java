package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import com.cognixia.jump.model.Manager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
	@GetMapping("/admin/teams")
	public ResponseEntity<?> getAllTeams(@RequestHeader(value="authorization") String header) {
		return ResponseEntity.status(200).body(service.getAllTeams());
	}


	@Operation(summary = "Get the teams of the current manager",
			description = "Get the teams of the manager that is currently logged in. " +
					"The manager must be logged in using a JWT token to access their team.")
	@ApiResponses(
			@ApiResponse(responseCode = "200",
					description = "Teams has been found")
	)
	@CrossOrigin
	@GetMapping("/teams")
	public ResponseEntity<?> getTeams(@RequestHeader(value="authorization") String header) {
		
		List<Team> myTeams = service.getMyTeams(header);
		return ResponseEntity.status(200).body(myTeams);
		
	}

	@Operation(summary = "Add a team to the current manager",
			description = "Add a team to the manager that is currently logged in. " +
					"The manager must be logged in using a JWT token to create their team.")
	@ApiResponses(
			@ApiResponse(responseCode = "201",
					description = "Team has been created")
	)
	@CrossOrigin
	@PostMapping("/teams")
	public ResponseEntity<?> addTeam(@RequestHeader(value="authorization") String header, @RequestBody Team newTeam) throws ResourceNotFoundException, ManagerHasTeamException {

		Team createdTeam = service.addTeam(header, newTeam);
		return ResponseEntity.status(201).body(createdTeam);

	}

	@Operation(summary = "Delete the selected team of the current manager",
			description = "Delete the selected team of the manager that is currently logged in. " +
					"The manager must be logged in using a JWT token to delete a team.")
	@ApiResponses(
			@ApiResponse(responseCode = "200",
					description = "Team has been deleted")
	)
	@CrossOrigin
	@DeleteMapping("/teams/{id}")
	public ResponseEntity<?> deleteManagerTeam(@RequestHeader(value="authorization") String header, @PathVariable Integer id ) throws ResourceNotFoundException {

		Team teamDeleted = service.deleteMyTeam(header, id);
		return ResponseEntity.status(200).body(teamDeleted);

	}

	@Operation(summary = "Update the selected team of the current manager",
			description = "Update the selected team of the manager that is currently logged in. " +
					"The manager must be logged in using a JWT token to update a team.")
	@ApiResponses(
			@ApiResponse(responseCode = "200",
					description = "Team has been Updated")
	)
	@CrossOrigin
	@PatchMapping("/teams")
	public ResponseEntity<?> updateMyTeam(@RequestHeader(value="authorization") String header, @RequestBody Team team) throws ResourceNotFoundException {

		Team updated = service.updateTeam(team);
		return ResponseEntity.status(200).body(updated);

	}

	// ## Admin Endpoints

	@Operation(summary = "Finds a team in the team table by its ID",
			description = "Finds a team in the team table by its ID from neon_db database." +
					"Used by admins to manage teams")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Team has been found"),
			@ApiResponse(responseCode = "404", description = "Team was not found")
	})
	@CrossOrigin
	@GetMapping("/admin/teams/{id}")
	public ResponseEntity<?> getTeamById(@PathVariable Integer id) throws ResourceNotFoundException {

		Team team = service.getTeamById(id);
		return ResponseEntity.status(200).body(team);

	}

	@Operation(summary = "Updates a team in the team table",
			description = "Updates a team in the team table from neon_db database." +
					"Used by admins to update teams")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Team has been updated"),
	})
	@CrossOrigin
	@PatchMapping("/admin/teams")
	public ResponseEntity<?> updateTeam(@RequestBody Team team) throws ResourceNotFoundException {

		Team updatedTeam = service.updateTeam(team);
		return ResponseEntity.status(200).body(updatedTeam);

	}

	@Operation(summary = "Deletes a team in the team table",
			description = "Deletes a team in the team table from neon_db database." +
					"Used by admins to delete teams")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Team has been deleted"),
			@ApiResponse(responseCode = "404", description = "Team was not found")
	})
	@CrossOrigin
	@DeleteMapping("/admin/teams/{id}")
	public ResponseEntity<?> deleteTeam(@PathVariable Integer id) throws ResourceNotFoundException {

		Team teamDeleted = service.deleteTeam(id);
		return ResponseEntity.status(200).body(teamDeleted);

	}

}
