package com.cognixia.jump.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Manager;
import com.cognixia.jump.model.Member;
import com.cognixia.jump.repository.ManagerRepository;
import com.cognixia.jump.repository.MemberRepository;
import com.cognixia.jump.util.JwtUtil;

@Service
public class MemberService {

	@Autowired
	MemberRepository repo;
	
	@Autowired
	ManagerRepository managerRepo;
	
	@Autowired
    JwtUtil jwtUtil;
	
	public List<Member> getAllMembers() {
		return repo.findAll();
	}
	
	public List<Member> getMembersByTeam(String header) throws ResourceNotFoundException {
		
		if( header == null || !header.startsWith("Bearer "))
            throw new ResourceNotFoundException("token"); 

        String jwt = header.substring(7);
        String username = jwtUtil.extractUsername(jwt);
		
		Manager foundManager = managerRepo.findByUsername(username).get();
		
		return repo.memberByTeam(foundManager.getTeam().getTeam_Id());
	}
	
}
