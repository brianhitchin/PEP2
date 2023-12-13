package com.cognixia.jump.controller;

import com.cognixia.jump.config.SecurityConfiguration;
import com.cognixia.jump.filter.JwtRequestFilter;
import com.cognixia.jump.model.Manager;
import com.cognixia.jump.model.Member;
import com.cognixia.jump.model.Team;
import com.cognixia.jump.service.ManagerDetailsService;
import com.cognixia.jump.service.MemberService;
import com.cognixia.jump.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.stereotype.Service;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

/*
@WebMvcTest(MemberController.class)
public class MemberControllerTest {

    // Might need to change this URI for cloud testing
    private static final String STARTING_URI = "http://localhost:8080/api";

    @Autowired
    private MockMvc mvc;

    @MockBean
    private MemberService service;

    @MockBean
    private ManagerDetailsService managerDetailsService;

    @MockBean
    private JwtUtil jwtUtil;

    @InjectMocks
    private MemberController controller;

    @Test
    public void testGetMembers() throws Exception {

        String uri = STARTING_URI + "/members";

        List<Member> members = new ArrayList<>();

        Manager manager = new Manager(1, "Cris", "cris", "edm", null, true);
        Team team = new Team(1, "Hawks", "Soccer", manager, members);
        manager.setTeam(team);

        members.add( new Member(1, team, "Member1", 1, 10, 11, 12, 1));
        members.add( new Member(2, team, "Member2", 2, 20, 21, 22, 2));

        team.setMember(members);

        when( service.getAllMembers() ).thenReturn(members);

        mvc.perform( get(uri) )
                .andDo( print() )
                .andExpect( status().isOk() )
                .andExpect( content().contentType( MediaType.APPLICATION_JSON_VALUE ) )

                // Member 1
                .andExpect( jsonPath( "$.length()" ).value( members.size() ) )
                .andExpect( jsonPath( "$[0].id" ).value( members.get(0).getId() ) )
                .andExpect( jsonPath( "$[0].team.id" ).value( members.get(0).getTeam().getTeam_Id() ) )
                .andExpect( jsonPath( "$[0].team.name" ).value( members.get(0).getTeam().getName() ) )
                .andExpect( jsonPath( "$[0].team.type" ).value( members.get(0).getTeam().getType() ) )
                .andExpect( jsonPath( "$[0].name" ).value( members.get(0).getName() ) )
                .andExpect( jsonPath( "$[0].jersey_num" ).value( members.get(0).getJersey_num()) )
                .andExpect( jsonPath( "$[0].scores" ).value( members.get(0).getScores()) )
                .andExpect( jsonPath( "$[0].assists" ).value( members.get(0).getAssists()) )
                .andExpect( jsonPath( "$[0].playtime" ).value( members.get(0).getPlaytime()) )
                .andExpect( jsonPath( "$[0].faults" ).value( members.get(0).getFaults()) )

                //Member 2
                .andExpect( jsonPath( "$[1].id" ).value( members.get(1).getId() ) )
                .andExpect( jsonPath( "$[1].team.id" ).value( members.get(0).getTeam().getTeam_Id() ) )
                .andExpect( jsonPath( "$[1].team.name" ).value( members.get(0).getTeam().getName() ) )
                .andExpect( jsonPath( "$[1].team.type" ).value( members.get(0).getTeam().getType() ) )
                .andExpect( jsonPath( "$[1].name" ).value( members.get(1).getName() ) )
                .andExpect( jsonPath( "$[1].jersey_num" ).value( members.get(1).getJersey_num()) )
                .andExpect( jsonPath( "$[1].scores" ).value( members.get(1).getScores()) )
                .andExpect( jsonPath( "$[1].assists" ).value( members.get(1).getAssists()) )
                .andExpect( jsonPath( "$[1].playtime" ).value( members.get(1).getPlaytime()) )
                .andExpect( jsonPath( "$[1].faults" ).value( members.get(1).getFaults()) );

        verify( service, times(1) ).getAllMembers();
        verifyNoMoreInteractions( service );
    }
}
*/
