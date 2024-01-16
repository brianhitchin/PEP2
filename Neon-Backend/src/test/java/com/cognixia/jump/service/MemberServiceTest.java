package com.cognixia.jump.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.cognixia.jump.model.Manager;
import com.cognixia.jump.model.Member;
import com.cognixia.jump.model.Team;
import com.cognixia.jump.repository.ManagerRepository;
import com.cognixia.jump.repository.MemberRepository;
import com.cognixia.jump.repository.TeamRepository;
import com.cognixia.jump.util.JwtUtil;

/*
@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

	@Mock
	private MemberRepository repo;
	
	@Mock
	private JwtUtil util;
	
	@Mock
	private ManagerRepository managerRepo;
	
	@Mock
	private TeamRepository teamRepo;
	
	@InjectMocks
	private MemberService service;
	
	/*
	@BeforeAll
	static void setup() {
		List<Member> TestMembers = new ArrayList<Member>();
		Manager testManager = new Manager(1, "Test", "test", "test", null, true);
		Team testTeam = new Team(1, "Test team", "Test type", testManager, TestMembers);
	}
	
	List<Member> TestMembers = new ArrayList<Member>();
	Manager testManager = new Manager(1, "Test", "test", "test", null, true);
	Team testTeam = new Team(1, "Test team", "Test type", testManager, TestMembers);
	
	@Test
	void testAllMembers() throws Exception {

		
		
		List<Member> allMembers = new ArrayList<Member>();

		allMembers.add( new Member(1, testTeam, "test1", 10, 10, 10, 10, 10, true, "www.url.com/image/10") );
		allMembers.add( new Member(2, testTeam, "test2", 20, 20, 20, 20, 20, true, "www.url.com/image/20") );
		
		when( repo.findAll() ).thenReturn(allMembers);
		
		List<Member> result = service.getAllMembers();
		
		for ( int i=0; i < allMembers.size(); i++ ) {
			
			if( !( allMembers.get(i).equals(result.get(i)) ) ) {
				fail();
			}
			
		}
	}
	
	@Test
	void testDeleteMember() throws Exception {
		
		String header = "header";
        String username = "brian";
        Member testMember = new Member(1, testTeam, "test1", 10, 10, 10, 10, 10, true, "www.url.com/image/10");
        TestMembers.add(testMember);
        testManager.setTeam(testTeam);
		        
        when(util.extractUsername(header)).thenReturn("brian");
        when(managerRepo.findByUsername(username)).thenReturn(Optional.of(testManager));
        
		int id = 1;	
						
		boolean deleted = service.deleteMember("Bearer header", id);
		assertTrue(deleted);
		
	}
	
	@Test
	void testUpdateStudent() throws Exception {
		
		String header = "header";
        String username = "brian";
		Member testMember = new Member(1, testTeam, "test1", 10, 10, 10, 10, 10, true, "www.url.com/image/10");
        TestMembers.add(testMember);
        testManager.setTeam(testTeam);
             
        when(repo.save(Mockito.any())).thenReturn(testMember);
		
        Member edited = service.editMember("Bearer header", testMember);
        assertEquals(edited, testMember);
	}
}

*/
