package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.Team;
import com.cognixia.jump.repository.TeamRepository;

@RestController
@RequestMapping("/api")
public class TeamController {

	@Autowired
	TeamRepository teamRepo;
	
	@GetMapping("/teams")
	public List<Team> getAllTeams() {
		return teamRepo.findAll();		
	}
	
}
