package com.cognixia.jump.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Member;
import com.cognixia.jump.model.Team;
import com.cognixia.jump.service.MemberService;

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
	
	@DeleteMapping("/members/{memberId}")
	public ResponseEntity<?> deleteMemberById(@RequestHeader(value="authorization") String header, @PathVariable Integer memberId) throws ResourceNotFoundException {
		if (service.deleteMember(header, memberId)) {
			return ResponseEntity.status(200).body("Member deleted.");
		} else {
			return ResponseEntity.status(400).body("Error"); /* replace with error if needed */
		}
	}
	
	@PutMapping("/members/{memberId}")
	public ResponseEntity<?> editMember(@RequestHeader(value="authorization") String header, @RequestBody Member editMember) throws ResourceNotFoundException {
		return ResponseEntity.status(200).body(service.editMember(header, editMember));
	}
}
