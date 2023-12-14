package com.cognixia.jump.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Manager implements Serializable {

    private static final long serialVersionUID = 1L;

    public static enum Role {

        ROLE_MANAGER, ROLE_ADMIN
    }

    @Schema(description = "Id of the manager")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer managerId;

    @Schema(description = "Name of the manager", example = "John Doe", requiredMode = Schema.RequiredMode.REQUIRED)
    @Column(nullable = false)
    @NotBlank
    private String name;

    @Schema(description = "Username for the manager account", example = "john_doe", requiredMode = Schema.RequiredMode.REQUIRED)
    @Column(unique = true, nullable = false)
    @NotBlank
    private String username;

    @Schema(description = "Password for the manager account", example = "Secr3tPassw0rd", requiredMode = Schema.RequiredMode.REQUIRED)
    @Column(nullable = false)
    @NotBlank
    private String password;

    @Schema(description = "Team of the manager", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "team_id", nullable = true, unique = true)
    private Team team;

    @Schema(description = "Role of the manager", example = "ROLE_MANAGER", requiredMode = Schema.RequiredMode.REQUIRED)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Schema(description = "Account enabled for the manager", example = "true")
    @Column(columnDefinition = "boolean default true")
    private boolean enabled;

    // Constructors
    public Manager() {}

    public Manager(Integer id, String name, String username, String password, Team team, boolean enabled){
        this.managerId = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.team = team;
        this.enabled = enabled;
    }

    // getters/setters
    public Integer getManagerId() {
        return managerId;
    }

    public void setManagerId(Integer managerId) {
        this.managerId = managerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Manager[" +
                "managerId=" + managerId +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", team=" + team +
                ", role=" + role +
                ", enabled=" + enabled +
                ']';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Manager)) return false;
        Manager manager = (Manager) o;
        return isEnabled() == manager.isEnabled() && Objects.equals(getManagerId(), manager.getManagerId()) && Objects.equals(getName(), manager.getName()) && Objects.equals(getUsername(), manager.getUsername()) && Objects.equals(getPassword(), manager.getPassword()) && Objects.equals(getTeam(), manager.getTeam()) && getRole() == manager.getRole();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getManagerId(), getName(), getUsername(), getPassword(), getTeam(), getRole(), isEnabled());
    }
}
