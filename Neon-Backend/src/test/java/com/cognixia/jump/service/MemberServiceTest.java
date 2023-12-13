package com.cognixia.jump.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.cognixia.jump.repository.MemberRepository;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

	@Mock
	private MemberRepository repo;
	
	@InjectMocks
	private MemberService service;
	
	@Test
	void testAllMembers() throws Exception {
		
	}
}
