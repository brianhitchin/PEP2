package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class Team implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer team_Id;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String type;
	
	@OneToOne( fetch = FetchType.LAZY, mappedBy = "team" )
    @JsonIgnore
    private Manager manager;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@OneToMany(mappedBy="team", cascade = CascadeType.ALL)
	private List<Member> member; //---------------THIS NEEDS TO BE IMPORTED LATER-------------------
	
	public Team() {
		
	}
	public Team(Integer team_Id, @NotBlank String name, @NotBlank String type, Manager manager, List<Member> member) {
		super();
		this.team_Id = team_Id;
		this.name = name;
		this.type = type;
		this.manager = manager;
		this.member = member;
	}
	public Integer getTeam_Id() {
		return team_Id;
	}
	public void setTeam_Id(Integer team_Id) {
		this.team_Id = team_Id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Manager getManager() {
		return manager;
	}
	public void setManager(Manager manager) {
		this.manager = manager;
	}
	public List<Member> getMember() {
		return member;
	}
	public void setMember(List<Member> member) {
		this.member = member;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Team)) return false;
		Team team = (Team) o;
		return Objects.equals(getTeam_Id(), team.getTeam_Id()) && Objects.equals(getName(), team.getName()) && Objects.equals(getType(), team.getType()) && Objects.equals(getManager(), team.getManager()) && Objects.equals(getMember(), team.getMember());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getTeam_Id(), getName(), getType(), getManager(), getMember());
	}
}

