package com.cognixia.jump.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Manager;
import com.cognixia.jump.model.Member;
import com.cognixia.jump.model.Team;
import com.cognixia.jump.repository.ManagerRepository;
import com.cognixia.jump.repository.MemberRepository;
import com.cognixia.jump.repository.TeamRepository;
import com.cognixia.jump.util.JwtUtil;

@Service
public class MemberService {

	@Autowired
	MemberRepository repo;
	
	@Autowired
	ManagerRepository managerRepo;
	
	@Autowired
	TeamRepository teamRepo;
	
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
	
	public boolean deleteMember(String header, Integer memberId) throws ResourceNotFoundException {

		if( header == null || !header.startsWith("Bearer "))
            throw new ResourceNotFoundException("token"); 

        String jwt = header.substring(7);
        String username = jwtUtil.extractUsername(jwt);
		
		List<Member> foundManagerTeamMemberList = managerRepo.findByUsername(username).get().getTeam().getMember();
		
		List<Integer> memberIds = new ArrayList<>();
		
		for (Member m: foundManagerTeamMemberList) {

			if(Objects.equals(m.getId(), memberId)){
				System.out.println("TEST?!!");
				repo.deleteById(memberId.intValue());
				return true;
			}
		}
		
		return false;

	}
	
	public Member editMember(String header, Member editedMember) throws ResourceNotFoundException {
		
		if( header == null || !header.startsWith("Bearer "))
            throw new ResourceNotFoundException("token"); 

        repo.save(editedMember);
		return editedMember;
        
	}

	public Member createMember(String header, Member member) throws ResourceNotFoundException {

		if( header == null || !header.startsWith("Bearer "))
			throw new ResourceNotFoundException("token");

		String jwt = header.substring(7);
		String username = jwtUtil.extractUsername(jwt);

		Team foundManagerTeam = managerRepo.findByUsername(username).get().getTeam();

		member.setId(null);
		member.setTeam(foundManagerTeam);
		Member created = repo.save(member);

		//Add to team
		List<Member> allMembers = foundManagerTeam.getMember();
		allMembers.add(created);

		foundManagerTeam.setMember(allMembers);

		teamRepo.save(foundManagerTeam);

		return created;
	}
}
