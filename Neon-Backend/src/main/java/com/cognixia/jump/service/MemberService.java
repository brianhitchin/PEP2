package com.cognixia.jump.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.cognixia.jump.exception.ResourceDoesNotBelongException;
import io.swagger.v3.oas.annotations.media.Schema;
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

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

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
	
	public List<Member> getMembersByTeam(String header, Integer team_id) throws ResourceNotFoundException, ResourceDoesNotBelongException {
		
		if( header == null || !header.startsWith("Bearer "))
            throw new ResourceNotFoundException("token"); 

        String jwt = header.substring(7);
        String username = jwtUtil.extractUsername(jwt);
		
		Manager foundManager = managerRepo.findByUsername(username).get();

		List<Team> teams = foundManager.getTeams();
		for(Team team : teams){

			if(team.getTeam_Id().equals(team_id)){
				return repo.memberByTeam(team.getTeam_Id());
			}
		}

		throw new ResourceDoesNotBelongException("team", "manager");
	}

	public Member addMember(String header, Member member, Integer team_id) throws ResourceNotFoundException, ResourceDoesNotBelongException {

		if( header == null || !header.startsWith("Bearer "))
			throw new ResourceNotFoundException("token");

		String jwt = header.substring(7);
		String username = jwtUtil.extractUsername(jwt);

		List<Team> foundManagerTeams = managerRepo.findByUsername(username).get().getTeams();

		Team teamFound = null;

		// Get specific Team to add member to
		for(int i = 0; i < foundManagerTeams.size(); i++){

			if(foundManagerTeams.get(i).getTeam_Id().equals(team_id))
				teamFound = foundManagerTeams.get(i);
		}

		if(teamFound == null){
			throw new ResourceDoesNotBelongException("team", "manager");
		}

		member.setId(null);
		member.setTeam(teamFound);
		Member created = repo.save(member);

		//Add to team
		List<Member> allMembers = teamFound.getMember();
		allMembers.add(created);

		teamFound.setMember(allMembers);

		teamRepo.save(teamFound);

		return created;
	}

	public boolean deleteMember(String header, Integer memberId, Integer team_id) throws ResourceNotFoundException, ResourceDoesNotBelongException {

		if( header == null || !header.startsWith("Bearer "))
            throw new ResourceNotFoundException("token"); 

        String jwt = header.substring(7);
        String username = jwtUtil.extractUsername(jwt);

		Manager manager = managerRepo.findByUsername(username).get();
		List<Team> teams = manager.getTeams();

		Team team = null;

		// Get specific Team to add member to
		for(int i = 0; i < teams.size(); i++){

			if(teams.get(i).getTeam_Id().equals(team_id))
				team = teams.get(i);
		}

		if(team == null){
			throw new ResourceDoesNotBelongException("team", "manager");
		}

		List<Member> members = team.getMember();

		for (int i = 0; i < members.size(); i++) {

			if (members.get(i).getId().equals(memberId)) {

				// Remove member from list
				Member memberToDelete = members.get(i);
				members.remove(i);

				// Delete member from the repository
				repo.delete(memberToDelete);

				// Update team
				team.setMember(members);
				teamRepo.save(team);

				// Update manager
				// # NEED TO TEST IF TEAMS IS UPDATED CORRECTLY
				manager.setTeams(teams);
				managerRepo.save(manager);

				return true;
			}
		}

		return false;

	}
	
	public Member editMember(String header, Member editedMember) throws ResourceNotFoundException, ResourceDoesNotBelongException {
		
		if( header == null || !header.startsWith("Bearer "))
            throw new ResourceNotFoundException("token");

		Optional<Member> memberOptional = repo.findById(editedMember.getId());

		if(memberOptional.isEmpty()){
			throw new ResourceNotFoundException("member");
		}

		Member myMember = memberOptional.get();
		myMember.setName(editedMember.getName());
		myMember.setJersey_num(editedMember.getJersey_num());
		myMember.setScores(editedMember.getScores());
		myMember.setAssists(editedMember.getAssists());
		myMember.setPlaytime(editedMember.getPlaytime());
		myMember.setFaults(editedMember.getFaults());
		myMember.setActive(editedMember.getActive());
		myMember.setImage(editedMember.getImage());

        repo.save(myMember);
		return myMember;
        
	}

	public Member getMemberById(Integer id) throws ResourceNotFoundException {

		Optional<Member> memberFound = repo.findById(id);

		if(memberFound.isPresent()){
			return memberFound.get();
		}
		else{
			throw new ResourceNotFoundException("Member");
		}
	}

	public Member updateMember(Member member) {



		return repo.save(member);
	}

	public Member deleteMember(Integer id) throws ResourceNotFoundException {

		Member toDelete = getMemberById(id);
		repo.delete(toDelete);
		return toDelete;
	}


}

