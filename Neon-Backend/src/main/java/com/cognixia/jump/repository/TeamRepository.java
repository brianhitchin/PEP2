package com.cognixia.jump.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer>{

	@Query("select t from Team t where team_id = 1?")
	public Optional<Team> teamByManager(Integer team_id);
	
}
