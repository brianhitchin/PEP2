package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

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

@RestController
@RequestMapping("/api")
public class TeamController {

	@Autowired
	TeamService service;
	
	@GetMapping("/teams")
	public List<Team> getAllTeams() {
		return service.getAllTeams();		
	}
	
	@GetMapping("/team")
	public ResponseEntity<?> getTeam(@RequestHeader(value="authorization") String header ) {
		
		Team myTeam = service.getMyTeam(header);
		return ResponseEntity.status(200).body(myTeam);
		
	}
	
	@CrossOrigin
	@PostMapping("/team/add")
	public ResponseEntity<?> addTeam(@RequestHeader(value="authorization") String header, @RequestBody Team newTeam) throws ResourceNotFoundException, ManagerHasTeamException {

		Team createdTeam = service.addTeam(header, newTeam);
		return ResponseEntity.status(201).body(createdTeam);

	}

}
