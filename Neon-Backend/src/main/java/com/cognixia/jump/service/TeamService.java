package com.cognixia.jump.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import com.cognixia.jump.exception.ManagerHasTeamException;
import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Manager;
import com.cognixia.jump.model.Team;
import com.cognixia.jump.repository.ManagerRepository;
import com.cognixia.jump.repository.TeamRepository;
import com.cognixia.jump.util.JwtUtil;

@Service
public class TeamService {

	@Autowired
	TeamRepository repo;
	
	@Autowired
	ManagerRepository managerRepo;
	
	@Autowired
    JwtUtil jwtUtil;
	
	public List<Team> getAllTeams() {
		return repo.findAll();
	}
	
	public List<Team> getMyTeams(String header) {
		
		if( header == null || !header.startsWith("Bearer "))
            return null; 

        String jwt = header.substring(7);
        String username = jwtUtil.extractUsername(jwt);
		
		Optional<Manager> foundManager = managerRepo.findByUsername(username);
		
		if (foundManager.isPresent()) {
			Manager manager = foundManager.get();

			// Get the manager's teams
			return manager.getTeams();
		}
		
		return null;
		
	}
	
	public Team addTeam(String header, Team newTeam) throws ResourceNotFoundException {
		
		if( header == null || !header.startsWith("Bearer "))
            throw new ResourceNotFoundException("token"); 

        String jwt = header.substring(7);
        String username = jwtUtil.extractUsername(jwt);
		
		Manager foundManager = managerRepo.findByUsername(username).get();

		newTeam.setTeam_Id(-1);
		newTeam.setManager(foundManager);

		return repo.save(newTeam);

	}
	
}
