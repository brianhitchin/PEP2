// MemberCard.js

import React, {useState} from 'react';
import MemberApi from "../apis/MemberApi";
import "../index.css"

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

    setOpen(!open);
    MemberApi.updateMember(localStorage.getItem("jwt"), member);

  };

  const deleteMember = (id) => {

    MemberApi.deleteMember(localStorage.getItem("jwt"), id, props.setMembers, props.members)

  }

  return (
      <div className="card d-inline-block m-4" style={{width:"250px"}} data-bs-theme="dark">
        <div className="card-header text-center">
          <h4>{member.name}</h4>
        </div>
        <div className="card-body">
          <div className="text-center">
            <p><strong>#{member.jersey_num}</strong> </p>
          </div>

          <hr/>

          <div className="text-start">
            <p><strong>Playtime:</strong> {member.playtime} minutes</p>
            <p><strong>Scores:</strong> {member.scores}</p>
            <p><strong>Assists:</strong> {member.assists}</p>
            <p><strong>Faults:</strong> {member.faults}</p>
          </div>


          <hr/>

          <div className="text-center">
            <button className="btn btn-light px-3 mx-2"
                    onClick={() => toggleUpdate()}>
              Update
            </button>
            <button className="btn btn-danger px-3 mx-2"
                    onClick={() => deleteMember(member.id)}>
              Delete
            </button>
          </div>

          {/*  Collapse  */}
          { open ? <div className="card-body">
                <div className="form-group form-control-sm">
                  <label htmlFor="teamName"><small>Name:</small></label>
                  <input
                      type="text"
                      id="name"
                      className="form-control form-control-sm"
                      name='name'
                      min="0"
                      value={member.name}
                      onChange={handleChange}
                      required/>
                </div>
                <div className="form-group form-control-sm">
                  <label htmlFor="teamName"><small>Jersey_num:</small></label>
                  <input
                      type="number"
                      id="jerseynum"
                      className="form-control"
                      name='jersey_num'
                      min="0"
                      value={member.jersey_num}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="form-group form-control-sm">
                  <label htmlFor="teamName"><small>Playtime:</small></label>
                  <input
                      type="number"
                      id="playtime"
                      className="form-control"
                      name='playtime'
                      min="0"
                      value={member.playtime}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="form-group form-control-sm">
                  <label htmlFor="teamName"><small>Scores:</small></label>
                  <input
                      type="number"
                      id="scores"
                      className="form-control"
                      name='scores'
                      min="0"
                      value={member.scores}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="form-group form-control-sm">
                  <label htmlFor="teamName"><small>Assists:</small></label>
                  <input
                      type="number"
                      id="assists"
                      className="form-control"
                      name='assists'
                      min="0"
                      value={member.assists}
                      onChange={handleChange}
                      required
                  />
                </div>

                <div className="form-group form-control-sm">
                  <label htmlFor="teamName">Faults:</label>
                  <input
                      type="number"
                      id="faults"
                      className="form-control"
                      name='faults'
                      min="0"
                      value={member.faults}
                      onChange={handleChange}
                      required
                  />
                </div>

                <hr/>

                <div className="text-center">
                  <button className="btn btn-primary m-1"
                          onClick={updateMember}>
                    Confirm Changes
                  </button>
                </div>

              </div>

              : null}
        </div>
      </div>
  );
};

export default MemberCard;
