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

		Manager manager = managerRepo.findByUsername(username).get();
		Team team = manager.getTeam();
		List<Member> members = team.getMember();

		for (int i = 0; i < members.size(); i++) {
			System.out.println(members);
			System.out.println("Member " + members.get(i).getId() + " || memberID: " + memberId);

			if (members.get(i).getId().equals(memberId)) {
				System.out.println("DELETE HERE");

				// Remove member from list
				Member memberToDelete = members.get(i);
				members.remove(i);

				// Delete member from the repository
				repo.delete(memberToDelete);

				// Update team
				team.setMember(members);
				teamRepo.save(team);

				// Update manager
				manager.setTeam(team);
				managerRepo.save(manager);

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
