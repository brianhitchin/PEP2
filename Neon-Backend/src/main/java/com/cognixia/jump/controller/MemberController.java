package com.cognixia.jump.controller;

import com.cognixia.jump.model.Manager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Member;
import com.cognixia.jump.model.Team;
import com.cognixia.jump.service.MemberService;

import javax.validation.Valid;

@Tag(name = "Members", description = "The API for managing members")
@CrossOrigin
@RestController
@RequestMapping("/api")
public class MemberController {

	@Autowired
	MemberService service;

	@Operation(summary = "Get all members in the member table",
	description = "Get all members in the member table from the neon_db database.")
	@ApiResponses(
			@ApiResponse(responseCode = "200", description = "All members successfully retrieved")
		)
	@CrossOrigin
	@GetMapping("/members")
	public ResponseEntity<?> getAllMembers() {
		return ResponseEntity.status(200).body(service.getAllMembers());
	}

	@Operation(summary = "Get all members in from the current manager's team",
			description = "Get all members in from the team of the manager that is currently logged in. " +
						  "The manager must be logged in using a JWT token to get all members in their team.")
	@ApiResponses(
			@ApiResponse(responseCode = "200", description = "All members in managers successfully retrieved")
	)
	@CrossOrigin
	@GetMapping("/mymembers")
	public ResponseEntity<?> getMembersByTeam(@RequestHeader(value="authorization") String header) throws ResourceNotFoundException {
		return ResponseEntity.status(200).body(service.getMembersByTeam(header));
	}

	@Operation(summary = "Add a member to the current manager's team",
			description = "Add a member to the team of the manager that is currently logged in. " +
						  "The manager must be logged in using a JWT token to add members into their team.")
	@ApiResponses(
			@ApiResponse(responseCode = "201", description = "Member was added to the team")
	)
	@CrossOrigin
	@PostMapping("/members/add")
	public ResponseEntity<?> addMember(@RequestHeader(value="authorization") String header, @Valid @RequestBody Member member) throws ResourceNotFoundException {

		Member newMember = service.createMember(header, member);
		return ResponseEntity.status(201).body(newMember);

	}

	@Operation(summary = "Delete a member from the current manager's team",
			description = "Delete a member from the team of the manager that is currently logged in. " +
					"The manager must be logged in using a JWT token to delete members from their team.")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Member removed from team"),
			@ApiResponse(responseCode = "400", description = "Member failed to be removed from team")
	})
	@CrossOrigin
	@DeleteMapping("/members/{memberId}")
	public ResponseEntity<?> deleteMemberById(@RequestHeader(value="authorization") String header, @PathVariable Integer memberId) throws ResourceNotFoundException {
		if (service.deleteMember(header, memberId)) {
			return ResponseEntity.status(200).body("Member deleted.");
		} else {
			return ResponseEntity.status(400).body("Error"); /* replace with error if needed */
		}
	}

	@Operation(summary = "Update a member from the current manager's team",
			description = "Update a member from the team of the manager that is currently logged in. " +
					"The manager must be logged in using a JWT token to update members from their team.")
	@ApiResponses(
			@ApiResponse(responseCode = "200", description = "Member updated in the team")
	)
	@CrossOrigin
	@PutMapping("/mymembers")
	public ResponseEntity<?> editMember(@RequestHeader(value="authorization") String header, @RequestBody Member editMember) throws ResourceNotFoundException {
		return ResponseEntity.status(200).body(service.editMember(header, editMember));
	}



}
