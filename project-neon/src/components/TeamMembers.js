// TeamMembers.js

import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import MemberApi from "../apis/MemberApi";

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [addedMember, setAddedMember] = useState({
    id: 0,
    team: null,
    name: '',
    jersey_num: 0,
    assists: 0,
    scores: 0,
    playtime: 0,
    faults: 0
  })
  const [ap, setAp] = useState(false)

  const dummyMembers = [
    {
      assists: 1,
      faults: 1,
      jerseyNumber: 1,
      name: "One",
      playtime: 1,
      scores: 1,
      teamId: 1,
    },
    {
      assists: 2,
      faults: 2,
      jerseyNumber: 2,
      name: "Two",
      playtime: 2,
      scores: 2,
      teamId: 2,
    },
    {
      assists: 3,
      faults: 3,
      jerseyNumber: 3,
      name: "Three",
      playtime: 3,
      scores: 3,
      teamId: 3,
    },
  ];

  // Simulate API call
  useEffect(() => {
    
    MemberApi.getMyMember(localStorage.getItem('jwt'), setMembers)

  }, []);

  const handleChange = (event) => {
    setAddedMember({
        ...addedMember,
        [event.target.name]: event.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('addedmember', addedMember)
    MemberApi.addMember(localStorage.getItem('jwt'), addedMember, members, setMembers)
    setAddedMember({
      id: 0,
      team: '',
      name: '',
      jersey_num: 0,
      assists: 0,
      scores: 0,
      playtime: 0,
      faults: 0
    })
    setAp(false)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {members.map((member) => (
          <div key={member.id} className="col-md-6">
            <MemberCard member={member} />
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={() => setAp(!ap)}>
        {ap ? "Cancel" : "Add Player"}
      </button>
      { ap && 
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="teamName">Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              name='name'
              value={addedMember.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="teamName">Jersey_num:</label>
            <input
              type="number"
              id="jerseynum"
              className="form-control"
              name='jersey_num'
              value={addedMember.jersey_num}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="teamName">Scores:</label>
            <input
              type="number"
              id="scores"
              className="form-control"
              name='scores'
              value={addedMember.scores}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="teamName">Assists:</label>
            <input
              type="number"
              id="assists"
              className="form-control"
              name='assists'
              value={addedMember.assists}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="teamName">Playtime:</label>
            <input
              type="number"
              id="playtime"
              className="form-control"
              name='playtime'
              value={addedMember.playtime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="teamName">Faults:</label>
            <input
              type="number"
              id="faults"
              className="form-control"
              name='faults'
              value={addedMember.faults}
              onChange={handleChange}
              required
            />
          </div>
        <button type="submit" className="btn btn-primary mt-2" onClick={submitHandler}>
          Create Member
        </button>
      </div>
      }
    </div>
  );
};

export default TeamMembers;
