package com.cognixia.jump.model;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class Member implements Serializable {

	private static final long serialVersionUID = 1L;

	@Schema(description = "Id of the member", example = "1001")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Schema(description = "team of the member")
	@ManyToOne
	@JoinColumn( name="team_id", referencedColumnName = "team_id", nullable = true)
	private Team team;

	@Schema(description = "Name of the member", example = "Mary Doe")
	@NotBlank
	private String name;

	@Schema(description = "Jersey number of the member", example = "24")
	@Min(0)
	private Integer jersey_num;

	@Schema(description = "Score record of the member", example = "10")
	@Min(0)
	private Integer scores;

	@Schema(description = "Assist record of the member", example = "23")
	@Min(0)
	private Integer assists;

	@Schema(description = "Playtime record of the member in minutes", example = "2043")
	@Min(0)
	private Integer playtime;

	@Schema(description = "Fault record of the member", example = "3")
	@Min(0)
	private Integer faults;

	@Schema(description = "Whether member is active", example = "true")
	private Boolean active;

	@Schema(description = "Image url of the member", example = "true")
	private String image;
	
	public Member() {
		
	}

	public Member(Integer id, Team team, String name, Integer jersey_num, Integer scores, Integer assists, Integer playtime, Integer faults, Boolean active, String image) {
		this.id = id;
		this.team = team;
		this.name = name;
		this.jersey_num = jersey_num;
		this.scores = scores;
		this.assists = assists;
		this.playtime = playtime;
		this.faults = faults;
		this.active = active;
		this.image = image;
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

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "Member[" +
				"id=" + id +
				", team=" + team +
				", name='" + name + '\'' +
				", jersey_num=" + jersey_num +
				", scores=" + scores +
				", assists=" + assists +
				", playtime=" + playtime +
				", faults=" + faults +
				", active=" + active +
				", image='" + image + '\'' +
				']';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Member)) return false;
		Member member = (Member) o;
		return Objects.equals(getId(), member.getId()) && Objects.equals(getTeam(), member.getTeam()) && Objects.equals(getName(), member.getName()) && Objects.equals(getJersey_num(), member.getJersey_num()) && Objects.equals(getScores(), member.getScores()) && Objects.equals(getAssists(), member.getAssists()) && Objects.equals(getPlaytime(), member.getPlaytime()) && Objects.equals(getFaults(), member.getFaults()) && Objects.equals(getActive(), member.getActive()) && Objects.equals(getImage(), member.getImage());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId(), getTeam(), getName(), getJersey_num(), getScores(), getAssists(), getPlaytime(), getFaults(), getActive(), getImage());
	}
}
