package com.cognixia.jump.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.List;
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

    @Schema(description = "Teams of the manager", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy="manager", cascade = CascadeType.ALL)
    private List<Team> teams;

    @Schema(description = "Role of the manager", example = "ROLE_MANAGER", requiredMode = Schema.RequiredMode.REQUIRED)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Schema(description = "Account enabled for the manager", example = "true")
    @Column(columnDefinition = "boolean default true")
    private boolean enabled;

    // Constructors
    public Manager() {}

    public Manager(Integer managerId, String name, String username, String password, List<Team> teams, Role role, boolean enabled) {
        this.managerId = managerId;
        this.name = name;
        this.username = username;
        this.password = password;
        this.teams = teams;
        this.role = role;
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

    public List<Team> getTeams() {
        return teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
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
                ", teams=" + teams +
                ", role=" + role +
                ", enabled=" + enabled +
                ']';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Manager)) return false;
        Manager manager = (Manager) o;
        return isEnabled() == manager.isEnabled() && Objects.equals(getManagerId(), manager.getManagerId()) && Objects.equals(getName(), manager.getName()) && Objects.equals(getUsername(), manager.getUsername()) && Objects.equals(getPassword(), manager.getPassword()) && Objects.equals(getTeams(), manager.getTeams()) && getRole() == manager.getRole();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getManagerId(), getName(), getUsername(), getPassword(), getTeams(), getRole(), isEnabled());
    }
}
