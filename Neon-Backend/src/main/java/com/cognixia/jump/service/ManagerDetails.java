package com.cognixia.jump.service;

import com.cognixia.jump.model.Manager;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class ManagerDetails implements UserDetails {

    private static final long serialVersionUID = 1L;

    private String username;
    private String password;
    private boolean enabled;
    private List<GrantedAuthority> authorities;

    // Constructor for Manager's Details for login
    public ManagerDetails(Manager manager){
        this.username = manager.getUsername();
        this.password = manager.getPassword();
        this.enabled = manager.isEnabled();
        this.authorities = List.of(new SimpleGrantedAuthority(manager.getRole().name()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
