package com.cognixia.jump.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.Manager;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Integer>{

	@Query("select m from Manager m where username = ?1")
	public Optional<Manager> findByUsername(String username);
	
}
