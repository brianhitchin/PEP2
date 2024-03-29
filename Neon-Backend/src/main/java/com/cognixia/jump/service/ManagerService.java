package com.cognixia.jump.service;

import com.cognixia.jump.exception.InvalidUpdateException;
import com.cognixia.jump.exception.ResourceAlreadyExistsException;
import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Manager;
import com.cognixia.jump.model.Member;
import com.cognixia.jump.model.Team;
import com.cognixia.jump.repository.ManagerRepository;
import com.cognixia.jump.repository.MemberRepository;
import com.cognixia.jump.repository.TeamRepository;
import com.cognixia.jump.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ManagerService {

    @Autowired
    ManagerRepository repo;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtil jwtUtil;

    public List<Manager> getAllManagers() {
        return repo.findAll();
    }

    public Manager createManager(Manager manager) throws ResourceAlreadyExistsException {

        // Ensure that manager does not already exist
        if(repo.findByUsername(manager.getUsername()).isPresent())
            throw new ResourceAlreadyExistsException("Username");

        manager.setManagerId(null);
        manager.setPassword(encoder.encode(manager.getPassword()));
        return repo.save(manager);
    }

    public Manager getManagerById(Integer id) throws ResourceNotFoundException {

        Optional<Manager> managerFound = repo.findById(id);

        if(managerFound.isPresent()){
            return managerFound.get();
        }
        else{
            throw new ResourceNotFoundException("Manager");
        }
    }

    public Manager updateManager(Manager manager, String header) throws ResourceNotFoundException, InvalidUpdateException {

        // Prevent the currently logged-in user from updating itself
        if(header == null || !header.startsWith("Bearer "))
            throw new ResourceNotFoundException("token");

        String jwt = header.substring(7);
        String username = jwtUtil.extractUsername(jwt);

        if(manager.getUsername().equals(username)){
            throw new InvalidUpdateException("admin");
        }

        return repo.save(manager);
    }

    public Manager deleteManager(Integer id) throws ResourceNotFoundException {

        Manager toDelete = getManagerById(id);

        // When we delete this manager, we need to delete it's team and it's members
        List<Team> teams = toDelete.getTeams();

        for(Team t: teams){

            memberRepository.deleteAll(t.getMember());
            teamRepository.delete(t);
        }

        repo.delete(toDelete);
        return toDelete;
    }

    public Manager getManagerByUsername(String username) throws ResourceNotFoundException {

        Optional<Manager> manager = repo.findByUsername(username);

        if(manager.isPresent()) {
            System.out.println("MANAGER HERE: " + manager.get().getUsername());
            return manager.get();
        }
        else
            throw new ResourceNotFoundException("Manager");
    }
}
