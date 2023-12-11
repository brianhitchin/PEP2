package com.cognixia.jump.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import com.cognixia.jump.model.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer>{

	@Query("select m from Member m where team_id = ?1")
	public List<Member> memberByTeam(Integer team_id);
	
}
