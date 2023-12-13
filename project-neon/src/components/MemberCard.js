// MemberCard.js

import React, {useState} from 'react';
import {Collapse} from "bootstrap";
import MemberApi from "../apis/MemberApi";

const MemberCard = (props) => {

  // Collapse for Updating each Member
  const [open, setOpen] = useState(false);

  const [member, setMember] = useState({
    id: props.member.id,
    team: {
      team_Id: props.member.team.team_Id,
      name: props.member.team.name,
      type: props.member.team.type
    },
    name: props.member.name,
    jersey_num: props.member.jersey_num,
    assists: props.member.assists,
    scores: props.member.scores,
    playtime: props.member.playtime,
    faults: props.member.faults

  });

  const handleChange = (event) => {
    setMember({
      ...member,
      [event.target.name]: event.target.value,
    })};

  const toggleUpdate = () => {

    setOpen(!open);
  }

  const updateMember = () => {

    MemberApi.updateMember(localStorage.getItem("jwt"), member);

  };

  const deleteMember = (id) => {

    MemberApi.deleteMember(localStorage.getItem("jwt"), id, setMember)

  }

  return (
      <div className="card mb-3">
        <div className="card-header text-center">
          <h4>{member.name}</h4>
        </div>
        <div className="card-body">
          <p><strong>Jersey Number:</strong> {member.jersey_num}</p>
          <p><strong>Assists:</strong> {member.assists}</p>
          <p><strong>Faults:</strong> {member.faults}</p>
          <p><strong>Playtime:</strong> {member.playtime}</p>
          <p><strong>Scores:</strong> {member.scores}</p>
          <p><strong>Team ID:</strong> {member.team.team_Id}</p>
          <div className="text-center">
            <button className="btn btn-primary m-3"
                    onClick={() => toggleUpdate()}
            >
              Update
            </button>
            <button className="btn btn-danger m-3"
                    onClick={() => deleteMember(member.id)}>
              Delete
            </button>
          </div>

          {/*  Collapse  */}
          { open ? <div className="card-body">
                <div className="form-group">
                  <label htmlFor="teamName">Name:</label>
                  <input
                      type="text"
                      id="name"
                      className="form-control"
                      name='name'
                      value={member.name}
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
                      value={member.jersey_num}
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
                      value={member.scores}
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
                      value={member.assists}
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
                      value={member.playtime}
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
                      value={member.faults}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary m-1"
                          onClick={updateMember}>
                    Submit
                  </button>
                </div>

              </div>

              : null}
        </div>
      </div>
  );
};

export default MemberCard;
