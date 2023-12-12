package com.cognixia.jump.controller;

import com.cognixia.jump.model.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Member;
import com.cognixia.jump.model.Team;
import com.cognixia.jump.service.MemberService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class MemberController {

	@Autowired
	MemberService service;
	
	@GetMapping("/members")
	public ResponseEntity<?> getAllMembers() {
		return ResponseEntity.status(200).body(service.getAllMembers());
	}
	
	@GetMapping("/mymembers")
	public ResponseEntity<?> getMembersByTeam(@RequestHeader(value="authorization") String header) throws ResourceNotFoundException {
		return ResponseEntity.status(200).body(service.getMembersByTeam(header));
	}

	@PostMapping("/members/add")
	public ResponseEntity<?> addMember(@RequestHeader(value="authorization") String header, @RequestBody Member member) throws ResourceNotFoundException {

		Member newMember = service.createMember(header, member);
		return ResponseEntity.status(201).body(newMember);

	}
	
	@DeleteMapping("/members/{memberId}")
	public ResponseEntity<?> deleteMemberById(@RequestHeader(value="authorization") String header, @PathVariable Integer memberId) throws ResourceNotFoundException {
		if (service.deleteMember(header, memberId)) {
			return ResponseEntity.status(200).body("Member deleted.");
		} else {
			return ResponseEntity.status(400).body("Error"); /* replace with error if needed */
		}
	}

	@CrossOrigin
	@PutMapping("/members/{memberId}")
	public ResponseEntity<?> editMember(@RequestHeader(value="authorization") String header, @RequestBody Member editMember) throws ResourceNotFoundException {
		return ResponseEntity.status(200).body(service.editMember(header, editMember));
	}



}
