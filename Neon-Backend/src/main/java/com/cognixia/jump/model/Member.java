package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.Objects;

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
	@JoinColumn( name="team_id", referencedColumnName = "team_id", nullable = true)
	private Team team;
	
	@NotBlank
	private String name;


	private Integer jersey_num;
	

	private Integer scores;
	

	private Integer assists;
	

	private Integer playtime;
	

	private Integer faults;
	
	public Member() {
		
	}

	public Member(Integer id, Team team, String name, Integer jersey_num, Integer scores, Integer assists, Integer playtime, Integer faults) {
		this.id = id;
		this.team = team;
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

	public void setTeam(Team team) {
		this.team = team;
	}
	
	public Team getTeam() {
		return team;
	}

	@Override
	public String toString() {
		return "Member [id=" + id + ", name=" + name + ", jersey_num=" + jersey_num + ", scores=" + scores
				+ ", assists=" + assists + ", playtime=" + playtime + ", faults=" + faults + "]";
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Member)) return false;
		Member member = (Member) o;
		return Objects.equals(getId(), member.getId()) && Objects.equals(getTeam(), member.getTeam()) && Objects.equals(getName(), member.getName()) && Objects.equals(getJersey_num(), member.getJersey_num()) && Objects.equals(getScores(), member.getScores()) && Objects.equals(getAssists(), member.getAssists()) && Objects.equals(getPlaytime(), member.getPlaytime()) && Objects.equals(getFaults(), member.getFaults());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId(), getTeam(), getName(), getJersey_num(), getScores(), getAssists(), getPlaytime(), getFaults());
	}
}
