package com.cognixia.jump.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class Member implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn( name="team_id", referencedColumnName = "team_id", nullable = false )
	private Team team_id;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private Integer jersey_num;
	
	@NotBlank
	private Integer scores;
	
	@NotBlank
	private Integer assists;
	
	@NotBlank
	private Integer playtime;
	
	@NotBlank
	private Integer faults;
	
	public Member() {
		
	}
	
	public Member(Integer id, @NotBlank String name, @NotBlank Integer jersey_num, @NotBlank Integer scores,
			@NotBlank Integer assists, @NotBlank Integer playtime, @NotBlank Integer faults) {
		super();
		this.id = id;
		this.name = name;
		this.jersey_num = jersey_num;
		this.scores = scores;
		this.assists = assists;
		this.playtime = playtime;
		this.faults = faults;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getJersey_num() {
		return jersey_num;
	}

	public void setJersey_num(Integer jersey_num) {
		this.jersey_num = jersey_num;
	}

	public Integer getScores() {
		return scores;
	}

	public void setScores(Integer scores) {
		this.scores = scores;
	}

	public Integer getAssists() {
		return assists;
	}

	public void setAssists(Integer assists) {
		this.assists = assists;
	}

	public Integer getPlaytime() {
		return playtime;
	}

	public void setPlaytime(Integer playtime) {
		this.playtime = playtime;
	}

	public Integer getFaults() {
		return faults;
	}

	public void setFaults(Integer faults) {
		this.faults = faults;
	}

	public void setTeam_id(Team team_id) {
		this.team_id = team_id;
	}

	@Override
	public String toString() {
		return "Member [id=" + id + ", name=" + name + ", jersey_num=" + jersey_num + ", scores=" + scores
				+ ", assists=" + assists + ", playtime=" + playtime + ", faults=" + faults + "]";
	}
	
}
